// app/(pages)/products/page.jsx
import ProductContent from "./ProductContent";

export const metadata = {
  title: "Products | Vform Tecnopacks",
  description: "Explore Vform Tecnopacks' range of plastic caps and closures. Located in Navi Mumbai, India. Call +91 99307 62241 or email us today.",
  keywords: "Vform Tecnopacks, plastic caps manufacturer, closures, Navi Mumbai, packaging solutions",
  openGraph: {
    title: "Products | Vform Tecnopacks",
    description: "Explore Vform Tecnopacks' range of plastic caps and closures. Located in Navi Mumbai, India.",
    url: "https://vform.in/products",
    siteName: "Vform Tecnopacks",
    images: [
      {
        url: "https://vform.in/images/contact-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Vform Tecnopacks - Plastic Caps and Closures Manufacturing",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Vform Tecnopacks",
    description: "Contact Vform Tecnopacks for inquiries about plastic caps and closures manufacturing. Located in Navi Mumbai, India.",
    images: ["https://vform.in/images/contact-og-image.jpg"],
  },
  alternates: {
    canonical: "https://vform.in/products",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ProductsPage() {
  return <ProductContent />;
}
