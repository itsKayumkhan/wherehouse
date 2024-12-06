import type { Metadata } from "next";
import { Sidebar } from "@/components/sidebar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
          <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/recharts/2.6.2/recharts.min.css"
          integrity="sha512-Xcr3A4r+8Qj+OwIXxKz3Ht9Ht4/wE7Oi9/6Jy9qNOxEDOyVwFvRZKbvJXZXAKlVKOzWZVZdBxMwxrRVqbOLh3w=="
          crossOrigin="anonymous"
        />
      <body>
      <div className="absolute top-0 -z-10 h-full w-full bg-white"><div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]" /></div>
        <div className="flex">
          <div className="lg:w-1/4">
            <Sidebar />
          </div>

          <div className="lg:w-[70%] mt-10 w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}