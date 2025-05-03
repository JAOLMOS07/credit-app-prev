import type { Metadata } from "next";
import { Inter} from "next/font/google";
import "./globals.css";
import {Providers} from "@/providers";
import {Toaster} from "react-hot-toast";
import ThemeButton from "@/components/ThemeButton/ThemeButton";
const inter = Inter({ subsets: ['latin'] });


export const metadata: Metadata = {
    title: 'Simula tu crédito',
    description: 'Aplicación para simular créditos',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>

    <body className={`${inter.className} bg-white dark:bg-gray-900`}>
    <Toaster position="top-right" />
    <Providers>{children}</Providers>
    <ThemeButton/>
    </body>
    </html>
);
}
