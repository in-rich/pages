import css from "./main.module.css";
import "@/assets/global.css";
import "@/assets/var.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { LayoutProps } from "@/typings";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "inrich - Add context to LinkedIn",
    template: "%s - inrich",
  },
  icons: {
    icon: "/images/icon.png",
    shortcut: "/images/icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${css.main}`}>{children}</body>
    </html>
  );
}
