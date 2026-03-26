import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://smartlivings.nl"),
  title: "SmartLivings | Smart Home Design & Build NL",
  description:
    "Interior design, material sourcing, and home execution in the Netherlands",
  openGraph: {
    title: "SmartLivings | Smart Home Design & Build NL",
    description:
      "Interior design, material sourcing, and home execution in the Netherlands",
    type: "website",
    locale: "en_NL",
    url: "https://smartlivings.nl",
    siteName: "SmartLivings",
  },
  alternates: {
    canonical: "https://smartlivings.nl",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-white font-sans text-zinc-900 antialiased">
        {children}
      </body>
    </html>
  );
}
