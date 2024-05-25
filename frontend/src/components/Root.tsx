import { Outlet } from "react-router-dom";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Root() {
  return (
    <div className="container mx-auto flex flex-col h-full">
      <Header />
      <main className="main grow flex flex-col justify-center items-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
