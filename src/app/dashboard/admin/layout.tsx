import { currentUser } from '@clerk/nextjs/server';
import Header from '@/components/dashboard/header/header'
import  Sidebar from '@/components/dashboard/sidebar/sidebar';
import { redirect } from "next/navigation";
import React, { ReactNode } from  'react'

export default async function AdminDashboardLayout({
    children,

}: {
    children:ReactNode;
}) {
    //block non admins from accessing the admin dashboard
    const user = await currentUser()
    if(!user || user.privateMetadata.role !== "ADMIN") redirect("/");
    return <div className="w-full h-full">
        {/** Sidebar*/}
        <Sidebar isAdmin/>
        <div className="ml-[300px]">
            {/** header*/}
            <Header/>
            <div className="w-full mt-[75px] p-4"> {children} </div>
        </div>
    </div>;
}