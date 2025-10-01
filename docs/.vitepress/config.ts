import {defineConfig} from 'vitepress';
import {useSidebar} from 'vitepress-openapi'

// const sidebar = useSidebar({
//   spec,
//   // Optionally, you can specify a link prefix for all generated sidebar items.
//   linkPrefix: '/operations/',
// })

// refer https://vitepress.dev/reference/site-config for details
export default defineConfig({
    title: "Termix",
    description: "Documentation",
    lastUpdated: true,
    cleanUrls: true,
    metaChunk: true,
    base: '/',
    head: [['link', {rel: 'icon', href: '/favicon.ico'}]],

    themeConfig: {
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Docs', link: '/install'}
        ],

        footer: {
            message: "Distributed under the Apache License Version 2.0",
            copyright: "© 2025 Luke Gustafson",
        },

        sidebar: [
            {
                text: 'Documentation',
                items: [
                    {
                        text: 'Getting Started',
                        items: [
                            {
                                text: 'Installation',
                                link: '/install',
                                items: [
                                    {
                                        text: 'Server',
                                        items: [
                                            {text: 'Docker', link: '/install/server/docker'},
                                            {text: 'Manual', link: '/install/server/manual-compile'}
                                        ]
                                    },
                                    {
                                        text: 'Connector',
                                        items: [
                                            {text: 'Windows', link: '/install/connector/windows'},
                                            {text: 'Linux', link: '/install/connector/linux'},
                                            {text: 'iOS', link: '/install/connector/ios'},
                                            {text: 'Android', link: '/install/connector/android'}
                                        ]
                                    }
                                ]
                            },
                            {text: 'Contributing', link: '/contributing'},
                        ],
                    },
                    {
                        text: 'Authentication',
                        items: [
                            {text: 'OIDC', link: '/oidc'},
                            {text: 'TOTP', link: '/totp'},
                        ],
                    },
                    {
                        text: 'Networking',
                        items: [
                            {text: 'Tunnels', link: '/tunnels'},
                            {text: 'SSL', link: '/ssl'},
                        ],
                    },
                    {
                        text: 'Data',
                        items: [
                            {text: 'JSON Import', link: '/json-import'},
                        ],
                    },
                    {
                        text: 'API Reference',
                        collapsed: true,
                        link: '/api-reference',
                        items: [],
                    },
                ],
            },
        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/LukeGus/Termix'},
            {icon: "discord", link: "https://discord.gg/jVQGdvHDrf"},
        ]
    },
    /** Give each dynamic page its own <title> */
    transformPageData(pageData) {
        // params returned from [*].paths.js|ts are available here
        const pageTitle = pageData.params?.pageTitle;

        if (pageTitle) {
            pageData.title = pageTitle;
            pageData.frontmatter ??= {};
            pageData.frontmatter.title = pageTitle;
        }
    },
});
