// app/(pages)/about/page.jsx
import Services from "./ServicesContent"; // Client component

export const metadata = {
  title: "Services | Vform Technopack",
  description: "Learn more about Vform Technopack and our commitment to quality packaging solutions.",
  openGraph: {
    title: "Services | Vform Technopack",
    description: "Your trusted partner for Vformand reliable closures.",
    url: "https://vform.in/services",
    siteName: "Vform Technopack",
    images: [
      {
        url: "https://vform.in/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vform Technopack",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Vform Technopack",
    description: "Discover our services and solutions at Vform Technopack.",
    images: ["https://vform.in/og-image.jpg"],
  },
};

export default function ServicesPage() {
  return <Services />;
}
