import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function Applayout() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-gradient-to-br from-brand-50 via-white to-light-100">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Applayout;
