// app/(pages)/about/page.jsx
import Services from "./ServicesContent"; // Client component

export const metadata = {
  title: "Services | Vform Tecnopacks",
  description: "Learn more about Vform Tecnopacks and our commitment to quality packaging solutions.",
  openGraph: {
    title: "Services | Vform Tecnopacks",
    description: "Your trusted partner for Vformand reliable closures.",
    url: "https://vform.in/services",
    siteName: "Vform Tecnopacks",
    images: [
      {
        url: "https://vform.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vform Tecnopacks",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Vform Tecnopacks",
    description: "Discover our services and solutions at Vform Tecnopacks.",
    images: ["https://vform.in/og-image.jpg"],
  },
};

export default function ServicesPage() {
  return <Services />;
}
