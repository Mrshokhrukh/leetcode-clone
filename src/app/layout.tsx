import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import RecoilContextProvider from "./recoilContextProvider/RecoilContextProvider";
import { ToastContainer } from "react-toastify";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LeetCode",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <link rel="icon" href="favicon.png" />
        {/* <Navbar /> */}
        <ToastContainer />
        <RecoilContextProvider>{children}</RecoilContextProvider>
      </body>
    </html>
  );
}
