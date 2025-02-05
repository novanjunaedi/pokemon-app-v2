import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return null;
};

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main className="w-full min-h-screen bg-gradient-to-b from-white to-blue-50">{children}</main>
            <Footer />
            <ScrollToTop />
        </>
    );
};

export default Layout;
