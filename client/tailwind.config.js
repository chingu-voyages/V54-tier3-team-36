/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Footer palette
        footerWhiteColor: "#C6DAF1",
        footerBackgroundColor: "#006666",
        footerUserProfiles: "#004848",
        footerLinkedinHoverColor: "#0072B1",

        // Game UI colors
        gameBackground: "#264653",
        gameCardText: "#FFFFFF",
        gameHeading: "#1F2937",
        gameCorrect: "#22C55E",
        gameCorrectGuesses: "#4ade80",
        gameProgressBar: "#374151",
        gameIncorrect: "#EF4444",
        gamePrimaryButton: "#4FB3F6",
        gamePrimaryButtonHover: "#3498DB",
        gameResetButton: "#DC2626",
        gameResetButtonHover: "#B91C1C",
        gameReplayButton: "#8B5CF6",
        gameReplayButtonHover: "#6D28D9",
        gameCloseButton: "#F97316",
        gameCloseButtonHover: "#EA580C",
        gameModalBg: "#1E293B",
        gameModalText: "#F8FAFC",
        gameTealAccent: "#2A9D8F",
        gameDarkBlue: "#1D3557",
        gameNight: "#000000"
      },
      animation: {
        shake: "shake 0.3s ease-in-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        celebrate: "celebrate 0.6s ease-out both",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite"
      },
      keyframes: {
        shake: {
          "0%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "50%": { transform: "translateX(5px)" },
          "75%": { transform: "translateX(-5px)" },
          "100%": { transform: "translateX(0)" }
        },
        celebrate: {
          "0%, 100%": { transform: "scale(1)", opacity: "1" },
          "50%": { transform: "scale(1.1)", opacity: "0.95" }
        },
        "glow-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 12px rgba(42, 157, 143, 0.7)",
            opacity: "1"
          },
          "50%": {
            boxShadow: "0 0 20px rgba(42, 157, 143, 0.9)",
            opacity: "0.85"
          }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" }
        }
      },
      boxShadow: {
        "animal-glow": "0 0 12px rgba(42, 157, 143, 0.7)",
        "animal-glow-hover": "0 0 20px rgba(42, 157, 143, 0.9)",
        "correct-glow": "0 0 20px rgba(34, 197, 94, 0.8)",
        "incorrect-glow": "0 0 20px rgba(239, 68, 68, 0.8)"
      },
      spacing: {
        128: "32rem",
        144: "36rem"
      }
    }
  },
  plugins: [],
  darkMode: "class"
};
