import React from "react";
import { RoutePermittedRole } from "@crema/constants/AppEnums";
import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Spin } from "antd";
import LogoutComponent from "./LogoutComponent";

const Orders = React.lazy(() => import("../../../modules/ecommerce/Orders"));

const ProductListing = React.lazy(
  () => import("../../../modules/ecommerce/Admin/Listing")
);
const AddProduct = React.lazy(
  () => import("../../../modules/ecommerce/Admin/AddEditProduct")
);
const EditProduct = React.lazy(
  () => import("../../../modules/ecommerce/Admin/EditProduct")
);

const LogInformation = React.lazy(
  () => import("../../../modules/ecommerce/Admin/LogTable")
);

const ErrorLogInformation = React.lazy(
  () => import("../../../modules/ecommerce/Admin/errorLogTable")
);

const DeleteProduct = React.lazy(() => import("../../../modules/ecommerce/Admin/DeleteProduct"));

export const ecommerceConfig = [
  {
    permittedRole: RoutePermittedRole.User,
    path: "/apps/ecommerce/orders",
    element: <Orders />,
  },

  {
    permittedRole: RoutePermittedRole.User,
    path: "/apps/admin/technician-listing",
    element: <ProductListing />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/apps/admin/add-products",
    element: <AddProduct />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/apps/admin/edit-products/:id",
    element: <EditProduct />,
  },
  {
    permittedRole: RoutePermittedRole.User,
    path: "/apps/admin/delete-products/:id",
    element: <DeleteProduct />,
  },

  {
    permittedRole: RoutePermittedRole.User,
    path: "/apps/admin/logs",
    element: <LogInformation />,
  },

  {
    permittedRole: RoutePermittedRole.User,
    path: "/apps/admin/error/logs",
    element: <ErrorLogInformation />,
  },

  {
    path: "/apps/logout",
    element: <LogoutComponent />, 
  }
];

const EcommerceRoutes = () => {
  return (
    <Suspense fallback={<Spin size="large" style={{ display: 'block', margin: 'auto', marginTop: '20%' }} />}>
      <Routes>
        {ecommerceConfig.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Routes>
    </Suspense>
  );
};

export default EcommerceRoutes;