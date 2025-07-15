// app/(pages)/careers/page.jsx
import { Suspense } from "react";
import Careers from "./CareersContent.jsx";

export const metadata = {
  title: "Careers | Vform Tecnopacks",
  description: "Learn more about Vform Tecnopacks and our commitment to quality packaging solutions.",
  openGraph: {
    title: "Careers | Vform Tecnopacks",
    description: "Your trusted partner for Vform and reliable closures.",
    url: "https://vform.in/careers",
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
    title: "Careers | Vform Tecnopacks",
    description: "Discover career opportunities at Vform Tecnopacks.",
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
