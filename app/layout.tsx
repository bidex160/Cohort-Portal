import type { Metadata } from "next";
import "./globals.css";
import "./proof.css";
import "./booking-actions.css";

export const metadata: Metadata = {
  title: "Smart Clinic Exchange | One ID, One Wallet, Multiple Hospitals",
  description: "Connect your hospital to a national patient, records, specialist and payments network—without giving up control.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
