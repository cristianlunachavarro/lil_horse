"use client";

import { Provider } from "react-redux";
import { Inter } from "next/font/google";
import store from "../store/store";
import "../app/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </Provider>
  );
}
