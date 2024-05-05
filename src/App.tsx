import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "@/pages/Root";
import HomePage from "@/pages/HomePage";
import SignInPage from "@/pages/SignInPage";
import SignUpPage from "@/pages/SignUpPage";
import TermsOfServicePage from "@/pages/TermsOfServicePage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import OccasionPage from "@/pages/occasion/OccasionPage";
import CreateOccasionPage from "@/pages/occasion/CreateOccasionPage";
import OccasionDetailPage from "@/pages/occasion/OccasionDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/sign-in/*",
        element: <SignInPage />,
      },
      {
        path: "/sign-up/*",
        element: <SignUpPage />,
      },
      {
        path: "/terms-of-service",
        element: <TermsOfServicePage />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicyPage />,
      },
      {
        path: "/occasions",
        element: <OccasionPage />,
      },
      {
        path: "/occasions/create",
        element: <CreateOccasionPage />,
      },
      {
        path: "/occasions/:occasionId",
        element: <OccasionDetailPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
