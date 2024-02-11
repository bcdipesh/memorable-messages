import { BrowserRouter } from "react-router-dom";

import AuthProvider from "@/authProvider/AuthProvider";
import AppRoutes from "@/components/routing/AppRoutes";
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  return (
    <div className="app">
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
          <Toaster />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
};

export default App;
