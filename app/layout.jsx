import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./GlobalRedux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Todo-app",
  description: "Basic todo-app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={
          (inter.className, "bg-gradient-to-r from-indigo-500 to-slate-600-400")
        }
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
