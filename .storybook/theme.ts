import { create } from "storybook/theming";

export default create({
  base: "dark", // 'light' | 'dark'

  // Branding
  brandTitle: "FigTok",
  brandUrl: "./",
  brandImage: "./assets/logo.png",
  brandTarget: "_self",

  // UI Colors
  colorPrimary: "#FF4785",
  colorSecondary: "#029CFD",

  // Backgrounds
  appBorderRadius: 4,

  // Typography
  fontBase: '"Inter", sans-serif',
  fontCode: "monospace",
  inputBorderRadius: 2,
});
