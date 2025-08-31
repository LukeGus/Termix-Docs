import DefaultTheme from "vitepress/theme";
import { theme, useOpenapi } from "vitepress-openapi/client";
import "vitepress-openapi/dist/style.css";
import spec from "../../docs/.vitepress/openapi.json";

export default {
  ...DefaultTheme,
  enhanceApp: async ({ app }) => {
    const openapi = useOpenapi({ spec, config: {} });
    theme.enhanceApp({ app, openapi });
  },
};