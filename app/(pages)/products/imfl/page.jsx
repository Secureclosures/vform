import IMFLPage from "./imflcontent";

export const metadata = {
  title: "imfl | Vform Tecnopacks",
  description: "imfl Vform Tecnopacks for inquiries about plastic caps and closures manufacturing. Located in Navi Mumbai, India. Call +91 99307 62241 or email us today.",
  keywords: "imfl Vform Tecnopacks, plastic caps manufacturer, closures inquiry, Navi Mumbai, packaging solutions imfl",
  openGraph: {
    title: "imfl | Vform Tecnopacks",
    description: "imfl Vform Tecnopacks for inquiries about plastic caps and closures manufacturing. Located in Navi Mumbai, India.",
    url: "https://vform.in/products/imfl",
    siteName: "Vform Tecnopacks",
    images: [
      {
        url: "https://vform.in/images/imfl-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "imfl Vform Tecnopacks - Plastic Caps and Closures Manufacturing",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "imfl Us | Vform Tecnopacks",
    description: "imfl Vform Tecnopacks for inquiries about plastic caps and closures manufacturing. Located in Navi Mumbai, India.",
    images: ["https://vform.in/images/imfl-og-image.jpg"],
  },
  alternates: {
    canonical: "https://vform.in/products/imfl",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function IMFLPages() {
  return <IMFLPage />;
}
