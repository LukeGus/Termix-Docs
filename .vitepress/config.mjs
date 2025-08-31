import {defineConfig} from 'vitepress'
import {useSidebar} from 'vitepress-openapi'
import spec from '../docs/.vitepress/openapi.json' with {type: 'json'}

const sidebar = useSidebar({ spec, linkPrefix: "/operations/" });

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "Termix",
    description: "Documentation",
    lastUpdated: true,
    cleanUrls: true,
    metaChunk: true,
    base: '/',
    head: [['link', {rel: 'icon', href: '/favicon.ico'}]],

    buildEnd: async () => {
        try {
            console.log("Regenerating OpenAPI specification...");
            await execAsync("node scripts/generate-openapi.js", {cwd: "./"});
            console.log("OpenAPI specification updated successfully!");
        } catch (error) {
            console.warn("Warning: Could not regenerate OpenAPI spec:", error.message);
        }
    },

    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav: [
            {text: 'Home', link: '/'},
            {text: 'Docs', link: '/install'}
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
                text: 'Documentation',
                items: [
                    {text: 'Installation', link: '/install'},
                    {
                        text: "API Reference",
                        collapsed: true,
                        link: "/api-reference",
                        items: [...sidebar.generateSidebarGroups()],
                    },
                ]
            }
        ],

        socialLinks: [
            {icon: 'github', link: 'https://github.com/LukeGus/Termix'},
            {icon: "discord", link: "https://discord.gg/jVQGdvHDrf"},
        ]
    }
})

