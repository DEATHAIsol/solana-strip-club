import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10B981', // Emerald-500
          dark: '#059669', // Emerald-600
        },
        surface: {
          DEFAULT: '#1f2937', // Gray-800
          dark: '#111827', // Gray-900
        },
      },
    },
  },
  plugins: [],
}

export default config 