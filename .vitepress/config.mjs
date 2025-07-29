import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Termix",
  description: "Documentation",
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  base: '/',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/docs' }
    ],

    search: {
      provider: "local",
    },

    footer: {
      message: "Distributed under the Apache License Version 2.0",
      copyright: "© 2025 Luke Gustafson",
    },

    sidebar: [
      {
        items: [
          { text: 'Docs', link: '/docs' },
          { text: 'GitHub', link: 'https://github.com/LukeGus/Termix' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/LukeGus/Termix' },
      { icon: "discord", link: "https://discord.gg/jVQGdvHDrf" },
    ]
  }
})
