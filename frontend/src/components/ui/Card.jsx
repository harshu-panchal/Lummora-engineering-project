import { motion } from 'framer-motion';
import clsx from 'clsx';

const Card = ({ children, className, hoverEffect = true }) => {
    return (
        <motion.div
            className={clsx(
                "bg-white p-8 rounded-sm border-l-4 border-transparent hover:border-lummora-500 transition-all duration-300",
                "shadow-[0_4px_20px_-2px_rgba(0,0,0,0.1)]",
                className
            )}
            whileHover={hoverEffect ? { y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" } : {}}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
};

export default Card;
