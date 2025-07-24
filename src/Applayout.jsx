import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function Applayout() {
  return (
    <div className="h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow w-full h-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Applayout;
