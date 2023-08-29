"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./GlobalRedux/provider";
import FirstRender from "@/components/FirstRender/FirstRender";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo-app",
  description: "Basic todo-app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <body className={(inter.className, "bg-white h-screen")}>
        <Providers>
          <FirstRender>{children}</FirstRender>
        </Providers>
      </body>
    </html>
  );
}
