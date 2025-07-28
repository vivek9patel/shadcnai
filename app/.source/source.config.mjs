// source.config.ts
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
var source_config_default = defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      themes: {
        light: "github-light",
        dark: "github-dark"
      }
    }
  }
});
var { docs, meta } = defineDocs({
  dir: "./app/docs"
});
export {
  source_config_default as default,
  docs,
  meta
};
