import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main className="min-h-screen mt-[77px]">
                <Outlet />
                <ToastContainer />
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;
