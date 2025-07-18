import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "./components/SmoothScrollProvider"; // adjust path if needed
import Head from 'next/head';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Vform Tecnopacks | High-Quality Plastic Caps & Closures Manufacturer",
  description: "Vform Tecnopacks is a leading manufacturer and exporter of premium plastic caps and closures for IMFL, water, juice, and CSD bottles. ISO certified, trusted by top brands.",
  keywords: "plastic caps, closures, IMFL closures, water bottle caps, juice closures, CSD closures, manufacturer, India, Vform Tecnopacks, tamper-evident, food grade, bulk packaging",
  icons: {
    icon: { url: '/favicon.ico', sizes: 'any' }
  },
  openGraph: {
    title: "Vform Tecnopacks | High-Quality Plastic Caps & Closures Manufacturer",
    description: "Premium plastic caps and closures for IMFL, water, juice, and CSD bottles. ISO certified, trusted by top brands.",
    url: "https://vform.in",
    siteName: "Vform Tecnopacks",
    images: [
      {
        url: "/logo.png",
        width: 400,
        height: 400,
        alt: "Vform Tecnopacks Logo"
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Vform Tecnopacks | High-Quality Plastic Caps & Closures Manufacturer",
    description: "Premium plastic caps and closures for IMFL, water, juice, and CSD bottles. ISO certified, trusted by top brands.",
    images: ["/logo.png"]
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1
    }
  },
  alternates: {
    canonical: "https://vform.in"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Vform Tecnopacks Pvt. Ltd." />
        <meta name="theme-color" content="#0e7490" />
        <meta name="description" content="Vform Tecnopacks is a leading manufacturer and exporter of premium plastic caps and closures for IMFL, water, juice, and CSD bottles. ISO certified, trusted by top brands." />
        <link rel="canonical" href="https://vform.in" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vform.in" />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:site_name" content="Vform Tecnopacks" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/logo.png" />
        <meta name="twitter:site" content="@vformtecnopacks" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Vform Tecnopacks',
          url: 'https://vform.in',
          logo: '/logo.png',
          contactPoint: [{
            '@type': 'ContactPoint',
            telephone: '+91-8657533268',
            contactType: 'customer service',
            email: 'admin@vform.in',
            areaServed: 'IN',
            availableLanguage: ['English', 'Hindi']
          }],
          sameAs: [
            'https://www.linkedin.com/company/vform-tecnopacks/',
            'https://www.secureclosures.com/'
          ]
        }) }} />
      </Head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
