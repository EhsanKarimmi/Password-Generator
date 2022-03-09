module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                cpy: "#36D399",
            },
        },
    },
    plugins: [require("daisyui")],
};
