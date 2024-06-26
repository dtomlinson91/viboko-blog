import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://viboko.io",

  author: {
    name: "Daniel Tomlinson",
    url: "https://viboko.io",
  },

  iconAssets: "iconify",

  logo: "/assets/icons/navbar_icon.svg",

  docsDir: "docs/src",

  darkmode: "enable",

  // repo: "vuepress-theme-hope/vuepress-theme-hope",

  // navbar
  navbar,
  navbarLayout: {
    start: ["Brand"],
    center: [],
    end: ["Links", "Outlook", "Search"],
  },

  // sidebar
  sidebar,

  // footer: "Default footer",

  displayFooter: false,

  encrypt: {
    config: {
      "/demo/encrypt.html": ["1234"],
    },
  },

  blog: {
    // description: "A FrontEnd programmer",
    // intro: "/intro.html",
    // medias: {
    //   Baidu: "https://example.com",
    //   BiliBili: "https://example.com",
    //   Bitbucket: "https://example.com",
    //   Dingding: "https://example.com",
    //   Discord: "https://example.com",
    //   Dribbble: "https://example.com",
    //   Email: "mailto:info@example.com",
    //   Evernote: "https://example.com",
    //   Facebook: "https://example.com",
    //   Flipboard: "https://example.com",
    //   Gitee: "https://example.com",
    //   GitHub: "https://example.com",
    //   Gitlab: "https://example.com",
    //   Gmail: "mailto:info@example.com",
    //   Instagram: "https://example.com",
    //   Lark: "https://example.com",
    //   Lines: "https://example.com",
    //   Linkedin: "https://example.com",
    //   Pinterest: "https://example.com",
    //   Pocket: "https://example.com",
    //   QQ: "https://example.com",
    //   Qzone: "https://example.com",
    //   Reddit: "https://example.com",
    //   Rss: "https://example.com",
    //   Steam: "https://example.com",
    //   Twitter: "https://example.com",
    //   Wechat: "https://example.com",
    //   Weibo: "https://example.com",
    //   Whatsapp: "https://example.com",
    //   Youtube: "https://example.com",
    //   Zhihu: "https://example.com",
    //   MrHope: "https://mister-hope.com",
    // },
  },

  metaLocales: {
    editLink: "Edit this page on GitHub",
  },

  plugins: {
    blog: true,

    comment: {
      // You should generate and use your own comment service
      provider: "Giscus",
      repo: "dtomlinson91/viboko-blog",
      repoId: "R_kgDOKeKTpA",
      category: "Announcements",
      categoryId: "DIC_kwDOKeKTpM4CZ_mu",
      darkTheme: "https://giscus.app/themes/purple_dark.css",
    },

    searchPro: {
      indexContent: false,
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
    },

    // all features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: false,
      codetabs: true,
      demo: false,
      echarts: false,
      figure: false,
      flowchart: false,
      gfm: false,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: false,
      mermaid: false,
      revealJs: false,
      // playground: {
      //   presets: ["ts", "vue"],
      // },
      // stylize: [
      //   {
      //     matcher: "Recommended",
      //     replacer: ({ tag }) => {
      //       if (tag === "em") {
      //         return {
      //           tag: "Badge",
      //           attrs: { type: "tip" },
      //           content: "Recommended",
      //         };
      //       }
      //     },
      //   },
      // ],
      sub: false,
      sup: false,
      tabs: true,
      vPre: false,
      vuePlayground: false,
    },

    prismjs: false,

    // uncomment these if you want a PWA
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cachePic: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  },
});
