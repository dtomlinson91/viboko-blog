import { defineUserConfig } from "vuepress";
import { shikiPlugin } from "@vuepress/plugin-shiki";
import { searchProPlugin } from "vuepress-plugin-search-pro";
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
      theme: "dracula-soft",
    }),
    searchProPlugin({
      indexContent: true,
      hotKeys: [{ key: "k", ctrl: true }],
      customFields: [
        {
          getter: (page) => page.frontmatter.category,
          formatter: "Category: $content",
        },
        {
          getter: (page) => page.frontmatter.tag,
          formatter: "Tag: $content",
        },
      ],
    }),
  ],

  // Enable it with pwa
  // shouldPrefetch: false,
});
