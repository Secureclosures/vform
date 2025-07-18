// app/(pages)/CSD/page.jsx
import CSDClosuresPage from "./CSDContent";

export const metadata = {
  title: "CSD | Vform Tecnopacks",
  description: "CSD Vform Tecnopacks for inquiries about plastic caps and closures manufacturing. Located in Navi Mumbai, India. Call +91 99307 62241 or email us today.",
  keywords: "CSD Vform Tecnopacks, plastic caps manufacturer, closures inquiry, Navi Mumbai, packaging solutions CSD",
  openGraph: {
    title: "CSD | Vform Tecnopacks",
    description: "CSD Vform Tecnopacks for inquiries about plastic caps and closures manufacturing. Located in Navi Mumbai, India.",
    url: "https://vform.in/products/csd",
    siteName: "Vform Tecnopacks",
    images: [
      {
        url: "https://vform.in/images/CSD-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CSD Vform Tecnopacks - Plastic Caps and Closures Manufacturing",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSD Us | Vform Tecnopacks",
    description: "CSD Vform Tecnopacks for inquiries about plastic caps and closures manufacturing. Located in Navi Mumbai, India.",
    images: ["https://vform.in/images/CSD-og-image.jpg"],
  },
  alternates: {
    canonical: "https://vform.in/products/csd",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CSDPage() {
  return <CSDClosuresPage />;
}
