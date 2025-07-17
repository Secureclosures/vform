import Watercontent from "./Watercontent";

export const metadata = {
  title: "Water | Vform Tecnopacks",
  description: "Water Vform Tecnopacks for inquiries about plastic caps and closures manufacturing. Located in Navi Mumbai, India. Call +91 99307 62241 or email us today.",
  keywords: "Water Vform Tecnopacks, plastic caps manufacturer, closures inquiry, Navi Mumbai, packaging solutions Water",
  openGraph: {
    title: "Water | Vform Tecnopacks",
    description: "Water Vform Tecnopacks for inquiries about plastic caps and closures manufacturing. Located in Navi Mumbai, India.",
    url: "https://vform.in/products/Water",
    siteName: "Vform Tecnopacks",
    images: [
      {
        url: "https://vform.in/images/Water-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Water Vform Tecnopacks - Plastic Caps and Closures Manufacturing",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Water Us | Vform Tecnopacks",
    description: "Water Vform Tecnopacks for inquiries about plastic caps and closures manufacturing. Located in Navi Mumbai, India.",
    images: ["https://vform.in/images/Water-og-image.jpg"],
  },
  alternates: {
    canonical: "https://vform.in/products/Water",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function WaterPage() {
  return <Watercontent />;
}
