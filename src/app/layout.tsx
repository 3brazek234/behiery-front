import type { Metadata } from "next";
import "./globals.css";
import { Tajawal } from "next/font/google";
import { Navbar } from "@/components/navbar";
import AutoStart from "@/components/auto-start";
import { Toaster } from "react-hot-toast";
import { Footer } from "@/components/Footer";

const poppins = Tajawal({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Behiery Store",
  description:
    "في بحيري للعطور، نؤمن بأن العطر ليس مجرد رائحة، بل هو تعبير عن شخصيتك وأسلوب حياتك. ندعوك لخوض تجربة فريدة لاكتشاف مجموعة واسعة من العطور العالمية والخاصة، التي صممت لتناسب كل ذوق ومناسبة. من الروائح الكلاسيكية الخالدة إلى أحدث الابتكارات العطرية، كل ما نقدمه هو قصة فخامة وجودة تنتظرك لتكتشفها.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning dir="rtl" className="">
      <body className={`${poppins.className} dark:bg-gray-900 `}>
        <Toaster />
        <AutoStart />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
