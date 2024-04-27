import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./pages/Root";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import TermsOfServicePage from "./pages/TermsOfServicePage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";

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
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
