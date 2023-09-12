"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./GlobalRedux/provider";
import FirstRender from "@/components/FirstRender/FirstRender";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo-app",
  description: "Basic todo-app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <body className={(inter.className, "bg-white h-screen select-none")}>
        <Providers>
          <FirstRender>{children}</FirstRender>
          <ToastContainer
            containerId={"normalError"}
            autoClose={3000}
            position="top-center"
            enableMultiContainer
          />
          <ToastContainer
            containerId={"limiterError"}
            autoClose={60 * 1000}
            position="top-center"
            pauseOnFocusLoss={false}
            enableMultiContainer
          />
        </Providers>
      </body>
    </html>
  );
}
