import { Suspense, lazy } from "react";
import { Outlet, Navigate, useRoutes } from "react-router-dom";

import DashboardLayout from "layouts";

import LoginPage from "pages/login";
import NotFoundPage from "pages/not-found";
import menu from "menu";
import { Box, CircularProgress } from "@mui/material";

// ----------------------------------------------------------------------

export default function AdminRouter() {
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <DashboardLayout>
          <Suspense
            fallback={
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            }
          >
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: Object.entries(menu).map(([key, value]) => {
        const Page = lazy(() => import(`pages/${value.srcPath}`));
        return {
          path: value.path,
          element: <Page />,
        };
      }),
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "404",
      element: <NotFoundPage />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
