import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function RootRouteLayout({ children }) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer/>
    </div>
  );
}
