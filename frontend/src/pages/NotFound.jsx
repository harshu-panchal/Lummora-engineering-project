import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import { AlertTriangle } from 'lucide-react';

const NotFound = () => {
    return (
        <section className="min-h-[80vh] flex items-center justify-center bg-slate-50 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

            <div className="container-custom relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-8">
                        <AlertTriangle size={48} className="text-yellow-600" />
                    </div>

                    <h1 className="font-heading font-bold text-6xl md:text-8xl text-lummora-900 mb-4">404</h1>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-700 mb-6">Page Not Found</h2>

                    <p className="text-gray-500 text-lg max-w-md mx-auto mb-10 leading-relaxed">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>

                    <Button to="/" variant="primary">
                        Return to Homepage
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

export default NotFound;
