import { defineUserConfig } from "vuepress";
import { shikiPlugin } from '@vuepress/plugin-shiki'
import { viteBundler } from '@vuepress/bundler-vite'
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "en-US",
  title: "viboko.io",
  description: "viboko.io",

  theme,
  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),

  plugins: [
    shikiPlugin({
      themes: {
        light: "min-dark",
        dark: "min-dark",
      },
    }),
  ],

  // Enable it with pwa
  // shouldPrefetch: false,
});
