// Importing components for routing
import { Route, Routes } from "react-router-dom";

// Importing components for various pages and layout
import Layout from "@/components/Layout";
import ProtectedRoute from "@/components/routing/ProtectedRoute";
import CreateOccasion from "@/pages/CreateOccasion";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Occasion from "@/pages/Occasion";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Profile from "@/pages/Profile";
import Signup from "@/pages/Signup";
import TermsOfService from "@/pages/TermsOfService";
import UpdateOccasion from "@/pages/UpdateOccasion";

/**
 * Component defining the application's routes.
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Root route with layout */}
      <Route path="/" element={<Layout />}>
        {/* Home page (index route) */}
        <Route index element={<Home />} />

        {/* Protected routes for authenticated users */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/occasions" element={<Occasion />} />
          <Route path="/occasions/create" element={<CreateOccasion />} />
          <Route path="/occasions/:id/update" element={<UpdateOccasion />} />
        </Route>

        {/* Static pages */}
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Route>

      {/* Authentication routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Catch-all route for unmatched paths */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
