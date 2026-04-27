import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Starbucks — Every Sip Has a Story",
  description: "Premium coffee experience, crafted for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
