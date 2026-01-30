import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';


// Since we are changing Layout to wrap 'routes' from App.jsx differently in plan, 
// wait, the Layout uses <Outlet/> so it expects nested routes.
// But we want to wrap Layout *around* the animated routes in App.jsx.
// So we should modify Layout to accept children seamlessly or stick to Outlet if we keep nested route structure.

// To support AnimatePresence, we usually lift the Layout out of the <Routes>.
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
