// app/(pages)/careers/page.jsx
import { Suspense } from "react";
import Careers from "./CareersContent.jsx";

export const metadata = {
  title: "Careers | Vform Technopack",
  description: "Learn more about Vform Technopack and our commitment to quality packaging solutions.",
  openGraph: {
    title: "Careers | Vform Technopack",
    description: "Your trusted partner for Vform and reliable closures.",
    url: "https://vform.in/careers",
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
    title: "Careers | Vform Technopack",
    description: "Discover career opportunities at Vform Technopack.",
    images: ["https://vform.in/og-image.jpg"],
  },
};

export default function CareersPage() {
  return (
    <Suspense fallback={<div>Loading Careers...</div>}>
      <Careers />
    </Suspense>
  );
}
