import { Suspense, lazy, useEffect, useState } from "react";
import { Outlet, Navigate, useRoutes, useNavigate } from "react-router-dom";

import DashboardLayout from "layouts";

import LoginPage from "pages/login";
import NotFoundPage from "pages/not-found";
import menu from "menu";
import { Box, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setPageTransition } from "store/slice/clientInfo";

// ----------------------------------------------------------------------

export default function AdminRouter() {
  const { loggedIn, check } = useSelector((state) => state.authInfo);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authenticatedRoutes = [
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
          element: <Page title={value.title} />,
        };
      }),
    },
  ];
  const unAuthenticatedRoutes = [
    {
      path: "login",
      element: <LoginPage />,
    },
  ];
  const commonRoutes = [
    {
      path: "notfound",
      element: <NotFoundPage />,
    },
    {
      path: "*",
      element: <Navigate to="/notfound" replace />,
    },
  ];

  const [routes, setRoutes] = useState(commonRoutes);

  useEffect(() => {
    if (loggedIn) {
      setRoutes(authenticatedRoutes.concat(commonRoutes));
    } else {
      setRoutes(unAuthenticatedRoutes.concat(commonRoutes));
    }
  }, [loggedIn]);

  useEffect(() => {
    if (!loggedIn) {
      dispatch(setPageTransition("switch"));
      navigate("/login", {
        replace: true,
      });
    } else if (loggedIn) {
      dispatch(setPageTransition("switch"));
      navigate("/", {
        replace: true,
      });
    }
  }, [check]);

  const router = useRoutes(routes);
  return router;
}
