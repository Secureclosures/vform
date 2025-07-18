import JuiceClosuresPage from "./juicecontent";

export const metadata = {
  title: "juice | Vform Tecnopacks",
  description: "juice Vform Tecnopacks for inquiries about plastic caps and closures manufacturing. Located in Navi Mumbai, India. Call +91 99307 62241 or email us today.",
  keywords: "juice Vform Tecnopacks, plastic caps manufacturer, closures inquiry, Navi Mumbai, packaging solutions juice",
  openGraph: {
    title: "juice | Vform Tecnopacks",
    description: "juice Vform Tecnopacks for inquiries about plastic caps and closures manufacturing. Located in Navi Mumbai, India.",
    url: "https://vform.in/products/juice",
    siteName: "Vform Tecnopacks",
    images: [
      {
        url: "https://vform.in/images/juice-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "juice Vform Tecnopacks - Plastic Caps and Closures Manufacturing",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "juice Us | Vform Tecnopacks",
    description: "juice Vform Tecnopacks for inquiries about plastic caps and closures manufacturing. Located in Navi Mumbai, India.",
    images: ["https://vform.in/images/juice-og-image.jpg"],
  },
  alternates: {
    canonical: "https://vform.in/products/juice",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function JuicePage() {
  return <JuiceClosuresPage />;
}
