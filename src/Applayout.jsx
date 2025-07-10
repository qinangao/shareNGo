import { Outlet } from "react-router";
import Navbar from "./components/Navbar";

function Applayout() {
  return (
    <>
      <Navbar />
      <main className="max-w-screen-xl mx-auto">
        <Outlet />
      </main>
    </>
  );
}

export default Applayout;
