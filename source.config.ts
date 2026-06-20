import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { remarkSteps } from "fumadocs-core/mdx-plugins";

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkSteps],
  },
});
