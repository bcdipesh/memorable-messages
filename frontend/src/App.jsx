import { BrowserRouter } from "react-router-dom";

import AuthProvider from "@/authProvider/AuthProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import AppRoutes from "@/components/routing/AppRoutes";
import { Toaster } from "@/components/ui/toaster";

/**
 * The main App component that wraps the entire application.
 * It provides the necessary context providers and sets up routing.
 *
 * @returns {React.JSX.Element} The App component.
 */
const App = () => {
  return (
    // ThemeProvider wraps the entire application to provide system wide dark and light theme
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="app">
        {/* AuthProvider wraps the application with authentication context */}
        <AuthProvider>
          {/* BrowserRouter provides the navigation context for routing */}
          <BrowserRouter>
            {/* AppRoutes contains the routing configuration for the application */}
            <AppRoutes />
            {/* Toaster displays toast notifications for the application */}
            <Toaster />
          </BrowserRouter>
        </AuthProvider>
      </div>
    </ThemeProvider>
  );
};

export default App;
