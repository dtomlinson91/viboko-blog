import { defineUserConfig } from "vuepress";
import { shikiPlugin } from "@vuepress/plugin-shiki";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "en-US",
  title: "viboko.io",
  description: "viboko.io",

  theme,
  plugins: [
    shikiPlugin({
      // your options
      // https://theme-hope.vuejs.press/guide/interface/code-theme.html#with-shiki-highlighter
      theme: "vitesse-dark",
    }),
  ],

  // Enable it with pwa
  // shouldPrefetch: false,
});
