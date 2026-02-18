import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Team from './pages/Team';
import Contact from './pages/Contact';
import EngineeringExcellence from './pages/EngineeringExcellence';
import QualitySafety from './pages/QualitySafety';
import SuccessStories from './pages/SuccessStories';
import WhyChooseUs from './pages/WhyChooseUs';
import HireXO from './pages/HireXO';
import Employee from './pages/Employee';
import Employer from './pages/Employer';
import Resources from './pages/Resources';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/layout/ScrollToTop';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import ContentManager from './pages/admin/ContentManager';
import TeamManager from './pages/admin/TeamManager';

// Page Transition Component
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};

function App() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {isAdminRoute ? (
        <Routes>
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/content" element={<ContentManager />} />
          <Route path="/admin/team" element={<TeamManager />} />
        </Routes>
      ) : (
        <Layout>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
              <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
              <Route path="/team" element={<PageTransition><Team /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
              <Route path="/engineering-excellence" element={<PageTransition><EngineeringExcellence /></PageTransition>} />
              <Route path="/quality-safety" element={<PageTransition><QualitySafety /></PageTransition>} />
              <Route path="/hirexo" element={<PageTransition><HireXO /></PageTransition>} />
              <Route path="/employee" element={<PageTransition><Employee /></PageTransition>} />
              <Route path="/employer" element={<PageTransition><Employer /></PageTransition>} />
              <Route path="/resources" element={<PageTransition><Resources /></PageTransition>} />
              <Route path="/success-stories" element={<PageTransition><SuccessStories /></PageTransition>} />
              <Route path="/why-choose-us" element={<PageTransition><WhyChooseUs /></PageTransition>} />
              <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </Layout>
      )}
    </>
  );
}

export default App;
