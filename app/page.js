
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CompanySection from "./components/about";
import Footer from "./components/footer";

export default function Home() {
  return (
    <main className="bg-black text-white font-sans">
      <Navbar />
      <Hero />
      <CompanySection />
      <Footer />
    </main>
  );
}