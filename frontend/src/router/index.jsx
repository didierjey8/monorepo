import { useRoutes, Navigate } from "react-router-dom";
import {
  Dashboard,
  DetailContract,
} from "../pages";
import ActivityEvidence from "../pages/ActivityEvidence";

function PrivateRoute({ component: Component, ...props }) {
  return <Component {...props} />;
}

function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Navigate to="/dashboard" />,
    },
    {
      path: "/dashboard",
      element: <PrivateRoute component={Dashboard} />,
    },
    {
      path: "/contract/:id",
      element: <PrivateRoute component={DetailContract} />,
    },
    {
      path: "/activityEvidence/:soli_id/:id_task",
      element: <PrivateRoute component={ActivityEvidence} />,
    },
  ]);
}

export default Router;
