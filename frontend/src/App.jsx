import { BrowserRouter } from "react-router-dom";

import AuthProvider from "@/authProvider/AuthProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import AppRoutes from "@/components/routing/AppRoutes";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="app">
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
            <Toaster />
          </BrowserRouter>
        </AuthProvider>
      </div>
    </ThemeProvider>
  );
};

export default App;
