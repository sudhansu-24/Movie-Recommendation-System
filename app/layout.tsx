import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "VectorCinema - AI-Powered Movie Recommendations",
  description: "Discover movies through intelligent AI-powered recommendations and semantic search. Built with vector similarity technology.",
  keywords: "movie recommendations, AI, vector search, cinema, film discovery",
  authors: [{ name: "Sudhansu" }],
  openGraph: {
    title: "VectorCinema - AI Movie Recommendations",
    description: "Discover movies through intelligent AI-powered recommendations",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-r from-purple-700/60 to-blue-500/90 max-w-7xl mx-auto">
        <main className="bg-slate-50/50 shadow-2xl drop-shadow-2xl">
          <Header />

          {children}
        </main>
      </body>
    </html>
  );
}
