import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "@/components/Root";
import Home from "@/modules/home/Home";
import SignInPage from "@/modules/auth/SignInPage";
import SignUpPage from "@/modules/auth/SignUpPage";
import TermsOfService from "@/modules/termsOfservice/TermsOfService";
import PrivacyPolicy from "@/modules/privacyPolicy/PrivacyPolicy";
import NotFound from "@/modules/notFound/NotFound";

import { OccasionsRoutes } from "@/modules/occasions/routes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
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
        element: <TermsOfService />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      ...OccasionsRoutes,
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
