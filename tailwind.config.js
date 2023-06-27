/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                tag: '#702EE6',
                'task-text': '#04142F',
                email: '#F58E0A',
                mention: '#07A873',
                url: '#5AACFF',
                'button-text': '#8A94A6',
                border: '#E7ECEF',
                primary: '#0D55CF',
                secondary: '#EAEFF5',
                ghost: '#C6CDD2',
                main: '#FAFBFB',
            },
            screens: {
                'less-custom-width': {max: '1230px'},
                'more-custom-width': {min: '1231px'}
            }
        },
    },
    plugins: [],
}

