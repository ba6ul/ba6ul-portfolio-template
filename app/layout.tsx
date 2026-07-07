import type { Metadata } from "next";
import { DM_Sans, Great_Vibes, Inter,Cherry_Bomb_One } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { cn } from "@/lib/utils";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const dmSans = DM_Sans({ subsets: ["latin"] });
const signatureFont = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-signature", 
});
const cherryBomb = Cherry_Bomb_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
});


export const metadata: Metadata = {
  title: "HariPin Studio",
  description: "Building apps and games for the modern world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("relative", "font-sans", inter.variable)}>
      <body className={clsx(dmSans.className,cherryBomb.variable, signatureFont.variable, "antialiased bg-[#EAEEFE]")}>
        {children}
      </body>
    </html>
  );
}
