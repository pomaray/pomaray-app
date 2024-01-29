import type { Config } from "tailwindcss";
const { nextui } = require("@nextui-org/react");

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			screens: {
				xs: "390px",
				xxs: "320px",
				tv: "2800px",
			},
		},
	},
	darkMode: "class",
	plugins: [
		nextui({
			themes: {
				dark: {
					colors: {
						background: "#303031",

						primary: {
							DEFAULT: "#1b6027",
							50: "#128f48",
							100: "#15a152",
							200: "#17af59",
							300: "#1bc063",
							400: "#1fcf6b",
							500: "#29e079",
							600: "#4bf193",
							700: "#5ff7a1",
							800: "#75faaf",
							900: "#99fac3",
						},

						content1: {
							DEFAULT: "#3a3a3c",
						},

						focus: {
							DEFAULT: "#397040",
							50: "#128f48",
							100: "#15a152",
							200: "#17af59",
							300: "#1bc063",
							400: "#1fcf6b",
							500: "#29e079",
							600: "#4bf193",
							700: "#5ff7a1",
							800: "#75faaf",
							900: "#99fac3",
						},
					},
				},
				light: {
					colors: {
						background: "#ededed",

						primary: {
							DEFAULT: "#397040",
							50: "#128f48",
							100: "#15a152",
							200: "#17af59",
							300: "#1bc063",
							400: "#1fcf6b",
							500: "#29e079",
							600: "#4bf193",
							700: "#5ff7a1",
							800: "#75faaf",
							900: "#99fac3",
						},

						focus: {
							DEFAULT: "#397040",
							50: "#128f48",
							100: "#15a152",
							200: "#17af59",
							300: "#1bc063",
							400: "#1fcf6b",
							500: "#29e079",
							600: "#4bf193",
							700: "#5ff7a1",
							800: "#75faaf",
							900: "#99fac3",
						},
					},
				},
			},
		}),
		require("tailwindcss-animate"),
	],
};

export default config;
