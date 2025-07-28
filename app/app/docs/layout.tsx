import { RootProvider } from "fumadocs-ui/provider";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { docs } from "@/.source";
import { createSearchAPI } from "fumadocs-core/search/server";
import { source } from "@/lib/source";

const baseOptions = {
  nav: {
    title: "shadcnai",
  },
};

export default function Layout({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return (
    <RootProvider>
      <DocsLayout tree={source.pageTree} {...baseOptions}>
        {children}
      </DocsLayout>
    </RootProvider>
  );
}
