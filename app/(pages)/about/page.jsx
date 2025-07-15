// app/(pages)/about/page.jsx
import AboutContent from "./AboutContent"; // Client component

export const metadata = {
  title: "About Us | Vform Tecnopacks",
  description: "Learn more about Vform Tecnopacks and our commitment to quality packaging solutions.",
  openGraph: {
    title: "About Vform Tecnopacks",
    description: "Your trusted partner for Vformand reliable closures.",
    url: "https://vform.in/about",
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
    title: "About Vform Tecnopacks",
    description: "Discover who we are and what drives Vform Tecnopacks.",
    images: ["https://vform.in/og-image.jpg"],
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
