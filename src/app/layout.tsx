import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/theme";
import CssBaseline from "@mui/material/CssBaseline";

export const metadata: Metadata = {
  title: "The Pic-tionary",
  description: "A single page web application to search and view images",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Google+Sans&family=Google+Sans+Text:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* Add header component with clickable name */}
          <div className="layout-container">
            <div>
              <h1 className="product-heading">The Pic-tionary</h1>
            </div>
            <div>{children}</div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
