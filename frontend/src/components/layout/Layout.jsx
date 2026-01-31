import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';


// So Layout will render {children} instead of Outlet if used as a wrapper.

const Layout = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen font-sans antialiased text-slate-800">
            <Navbar />
            <main className="flex-grow pt-[80px]">
                {/* added padding top for fixed navbar if needed, or stick to normal flow */}
                {children || <Outlet />}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
