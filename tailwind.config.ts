import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#ecf5ff",
          100: "#d7eaff",
          200: "#b2d5ff",
          300: "#84bbff",
          400: "#5b9fff",
          500: "#2f82ff",
          600: "#1f6ade",
          700: "#1b57b3",
          800: "#194a92",
          900: "#163d75"
        },
        ink: {
          50: "#f6f7fb",
          100: "#eceef6",
          200: "#d6d9e6",
          300: "#b4b9cd",
          400: "#8c93ab",
          500: "#6d748c",
          600: "#565c73",
          700: "#42475a",
          800: "#2f3344",
          900: "#222533"
        }
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #2f82ff 0%, #1f6ade 40%, #1b57b3 100%)",
        "glass-1": "radial-gradient(circle at 20% 20%, rgba(47,130,255,0.12), transparent 35%), radial-gradient(circle at 80% 0%, rgba(91,159,255,0.14), transparent 40%)"
      },
      boxShadow: {
        card: "0 14px 45px -25px rgba(22,37,53,0.45), 0 4px 14px -8px rgba(31,106,222,0.25)",
        soft: "0 10px 30px -20px rgba(22,37,53,0.35)"
      },
      borderRadius: {
        "xlplus": "1.1rem"
      }
    }
  },
  plugins: []
} satisfies Config;
