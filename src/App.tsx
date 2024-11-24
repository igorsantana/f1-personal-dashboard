// import { useState } from "react";
import "./App.css";
import Layout from "./components/app/layout";
import { ThemeProvider } from "./components/theme-provider";
import F1Provider from "./provider";

export default function App() {
  return (
    <F1Provider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout></Layout>
      </ThemeProvider>
    </F1Provider>
  );
}
