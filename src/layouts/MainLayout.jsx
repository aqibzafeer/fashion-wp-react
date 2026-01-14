import Header from "../components/header/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => (
  <div className="min-h-screen flex flex-col">
    {/* Header is sticky internally */}
    <Header />

    <main className="grow">
      <Outlet />
    </main>

    {/* Footer */}
    <Footer />
  </div>
);

export default MainLayout;
