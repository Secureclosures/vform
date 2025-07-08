import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/footer";

export default function Layout({ children }) {
  return (
    <main>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
