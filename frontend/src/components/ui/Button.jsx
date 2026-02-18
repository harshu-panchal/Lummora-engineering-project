import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

const Button = ({ children, variant = 'primary', className, to, onClick, ...props }) => {
    const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-none text-base font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide uppercase";

    const variants = {
        primary: "bg-lummora-700 text-white hover:bg-lummora-800 focus:ring-lummora-500 shadow-md hover:shadow-lg",
        secondary: "bg-lummora-200 text-lummora-900 hover:bg-lummora-300 focus:ring-lummora-500",
        outline: "border-2 border-lummora-700 text-lummora-700 hover:bg-lummora-700 hover:text-white focus:ring-lummora-500",
        white: "bg-white text-lummora-900 hover:bg-gray-100 focus:ring-white shadow-md",
        ghost: "text-lummora-700 hover:bg-lummora-50 hover:text-lummora-900"
    };

    const isExternal = typeof to === 'string' && (to.startsWith('http') || to.startsWith('//'));
    const Component = to ? (isExternal ? 'a' : Link) : motion.button;
    const motionProps = to ? {} : { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } };
    const linkProps = isExternal ? { href: to, target: "_blank", rel: "noopener noreferrer" } : { to };

    return (
        <Component
            {...linkProps}
            onClick={onClick}
            className={clsx(baseStyles, variants[variant], className)}
            {...motionProps}
            {...props}
        >
            {children}
        </Component>
    );
};

export default Button;
