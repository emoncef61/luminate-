import { db } from '@/lib/db'
import { clerkClient } from '@clerk/nextjs/server'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest, userAgent } from 'next/server'
import type { User } from '@/generated/prisma'

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req)

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data
    const eventType = evt.type
    console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
    console.log('Webhook payload:', evt.data)
    //when user created or updated 
    if (evt.type === 'user.created' || evt.type === 'user.updated') {
       const data = evt.data
       const user: Partial<User> = {
        id: data.id, 
        name: `${data.first_name} ${data.last_name}`,
        email: data.email_addresses[0].email_address,
        picture: data.image_url,
      };
      if (!user) return;

      const dbUser= await db.user.upsert({ //await before starting the next stuff
        where:{
          email:user.email
        },
        update:{
          name: user.name,
          email: user.email,
          picture: user.picture,
        },
        create:{
          id:user.id!,
          name:user.name!,
          email:user.email!,
          picture:user.picture!,
          role: user.role||"USER",

        },
      });
        const client = await clerkClient()
        await client.users.updateUserMetadata(data.id, { 
          privateMetadata: {
            role: dbUser.role || "USER",
          },
        });

        console.log('userId:', evt.data.id)
      
    }
    //when user created or updated 
    if (evt.type === 'user.deleted'){
       const userId=evt.data.id;
       await db.user.delete({
         where:{
          id:userId,
        },
       })
    }


    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}