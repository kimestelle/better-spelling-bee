import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'vanilla-flap': {
          '0%': { backgroundImage: "url('/game-assets/duck.svg')" },
          '40%': { backgroundImage: "url('/game-assets/duck-fly.svg')" },
          '100%': { backgroundImage: "url('/game-assets/duck.svg')" },
        },
        'flap': {
          '0%': { backgroundImage: "url('/game-assets/duck.svg')", zIndex: '1' },
          '40%': { backgroundImage: "url('/game-assets/duck-fly.svg')", transform: 'translateY(-2%)', zIndex: '1' },
          '100%': { backgroundImage: "url('/game-assets/duck.svg')", zIndex: '1' },
        },
        'shake': {
          '0%': { backgroundImage: "url('/game-assets/duck.svg')" },
          '15%': { backgroundImage: "url('/game-assets/duck-shake.svg')", backgroundSize: '94%' },
          '100%': { backgroundImage: "url('/game-assets/duck.svg')" },
        },
      },
      animation: {
        'vanilla-flap': 'vanilla-flap 0.2s steps(1) infinite',
        'flap': 'flap 0.2s',
        'shake': 'shake 0.4s steps(1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
