// import { useState } from "react";
import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import F1Provider from "./provider";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <F1Provider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        {children}
      </ThemeProvider>
    </F1Provider>
  );
}
