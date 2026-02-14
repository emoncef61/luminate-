// Next.js
import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans, Playfair_Display, The_Girl_Next_Door} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

//global css
const geistSansFont = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

//fonts
const geistMonoFont = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dmSansFont = DM_Sans({
  subsets : ["latin"],
  variable: "--font-dm-sans",
  weight:['500','400','700'],
  style:["italic","normal"]
})

const playfairDisplayFont = Playfair_Display({
  subsets : ["latin"],
  variable: "--font-playfair-display",
  weight:['400'],
  style:["normal"]
})


//Metadata
export const metadata: Metadata = {
  title: "Luminate",
  description: "Welcome to Luminate Handmade candles with Long lasting fragrance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    /* Without suppressHydrationWarning, React compares the server's clean <html> tag with the client's <html class="dark"> tag and panics. 
    This attribute tells React: "I'm expecting this specific tag to change on the client, so don't worry about it."  */

    <html lang="en" suppressHydrationWarning> 
      <body
        className={`${geistSansFont.variable} ${geistMonoFont.variable} ${dmSansFont.variable} ${playfairDisplayFont.variable} antialiased`}
      >
        <ThemeProvider 
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}