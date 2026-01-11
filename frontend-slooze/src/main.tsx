import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from "./context/theme.tsx"
import { AuthProvider } from './context/authContext.tsx';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
          <App />
      </AuthProvider>
        </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
