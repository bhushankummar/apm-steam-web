import React from "react";
import { RoutePermittedRole } from "@crema/constants/AppEnums";

const Orders = React.lazy(() => import("../../../modules/ecommerce/Orders"));

const ProductListing = React.lazy(
  () => import("../../../modules/ecommerce/Admin/Listing/Listing")
);
const AddProduct = React.lazy(
  () => import("../../../modules/ecommerce/Admin/AddEditProduct")
);
const EditProduct = React.lazy(
  () => import("../../../modules/ecommerce/Admin/EditTechnician/EditTechnician")
);

const LogInformation = React.lazy(
  () => import("../../../modules/ecommerce/Admin/LogTable")
);

const ErrorLogInformation = React.lazy(
  () => import("../../../modules/ecommerce/Admin/errorLogTable")
);


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
    path: "/apps/admin/logs",
    element: <LogInformation />,
  },

  {
    permittedRole: RoutePermittedRole.User,
    path: "/apps/admin/error/logs",
    element: <ErrorLogInformation />,
  },
];
