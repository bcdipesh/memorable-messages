import Occasions from "@/modules/occasions/Occasions";
import CreateOccasion from "@/modules/occasions/CreateOccasion";
import OccasionDetail from "@/modules/occasions/OccasionDetail";

export const OccasionsRoutes = [
  {
    path: "/occasions",
    children: [
      {
        index: true,
        element: <Occasions />,
      },
      {
        path: "create",
        element: <CreateOccasion />,
      },
      {
        path: ":occasionId",
        element: <OccasionDetail />,
      },
    ],
  },
];
