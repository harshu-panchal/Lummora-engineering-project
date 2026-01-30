/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                heading: ['Outfit', 'sans-serif'],
                sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            },
            colors: {
                lummora: {
                    50: '#f0fdfa',
                    100: '#ccfbf1',
                    200: '#99f6e4',
                    300: '#5eead4',
                    400: '#2dd4bf', // Neon Cyan
                    500: '#14b8a6',
                    600: '#0d9488',
                    700: '#0f766e',
                    800: '#115e59',
                    900: '#134e4a',
                    950: '#042f2e',
                },
                neon: {
                    blue: '#00f3ff',
                    green: '#39ff14',
                    purple: '#bc13fe',
                },
                dark: {
                    bg: '#050505', // Almost black
                    card: '#0a0a0a', // Slightly lighter
                    border: '#1f2937',
                }
            },
            container: {
                center: true,
                padding: '1rem',
            }
        },
    },
    plugins: [],
}
