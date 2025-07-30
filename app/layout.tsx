import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "VectorCinema",
  description: "Discover movies through intelligent AI-powered recommendations and semantic search. Built with vector similarity technology.",
  keywords: "movie recommendations, AI, vector search, cinema, film discovery",
  authors: [{ name: "Sudhansu" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
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
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </head>
      <body className="bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/30 min-h-screen max-w-7xl mx-auto">
        <main className="bg-dark-primary/80 backdrop-blur-sm shadow-2xl drop-shadow-2xl min-h-screen">
          <Header />
          
          <div className="pt-44 text-dark-text">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
