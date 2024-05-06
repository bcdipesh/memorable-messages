import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "@/components/Root";
import HomePage from "@/modules/home/HomePage";
import SignInPage from "@/modules/auth/SignInPage";
import SignUpPage from "@/modules/auth/SignUpPage";
import TermsOfServicePage from "@/modules/termsOfservice/TermsOfServicePage";
import PrivacyPolicyPage from "@/modules/privacyPolicy/PrivacyPolicyPage";
import OccasionPage from "@/modules/occasion/OccasionPage";
import CreateOccasionPage from "@/modules/occasion/CreateOccasionPage";
import OccasionDetailPage from "@/modules/occasion/OccasionDetailPage";

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
