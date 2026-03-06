import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Glitec Advanced School of Technology",
  description:
    "Glitec Advanced School of Technology offers cutting-edge tech and vocational programs. Learn online or in-person and boost your career with practical skills.",
  keywords:
    "Glitec, technology courses, vocational training, online learning, ICT training, auto mechanics, business skills",
  authors: [{ name: "Glitec Advanced School of Technology" }],
  creator: "Glitec Advanced School of Technology",
  openGraph: {
    title: "Glitec Advanced School of Technology",
    description:
      "Hands-on, industry-focused programs in technology, auto mechanics, business, and more. Learn online or in-person.",
    url: "https://www.glitec.com",
    siteName: "Glitec Advanced School of Technology",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Glitec Advanced School of Technology",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Glitec Advanced School of Technology",
    description:
      "Hands-on, industry-focused programs to advance your skills and career.",
    images: ["/assets/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0A2540" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}