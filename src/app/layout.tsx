import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ShadcnAI Theme Generator",
  description: "Generate beautiful shadcn/ui themes using AI",
  keywords: ["shadcn", "ui", "themes", "ai", "generator", "colors"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
