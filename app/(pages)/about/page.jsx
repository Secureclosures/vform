// app/(pages)/about/page.jsx
import AboutContent from "./AboutContent"; // Client component

export const metadata = {
  title: "About Us | Vform Technopack",
  description: "Learn more about Vform Technopack and our commitment to quality packaging solutions.",
  openGraph: {
    title: "About Vform Technopack",
    description: "Your trusted partner for Vformand reliable closures.",
    url: "https://vform.in/about",
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
    title: "About Vform Technopack",
    description: "Discover who we are and what drives Vform Technopack.",
    images: ["https://vform.in/og-image.jpg"],
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
