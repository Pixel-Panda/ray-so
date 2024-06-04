import { Fira_Code, IBM_Plex_Mono, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });
// const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: "500", display: "swap" });
// const ibmPlexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: "500", display: "swap" });
// const firaCode = Fira_Code({ subsets: ["latin"], weight: "400", display: "swap" });

const url = `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

export const metadata = {
  metadataBase: new URL(url),
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}