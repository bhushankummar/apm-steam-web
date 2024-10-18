import React from "react";
import { Routes, Route } from "react-router-dom";
import { Spin } from "antd";
import { Suspense } from "react";

// Lazy load the components for better performance
const Orders = React.lazy(() => import("../../../modules/adminPanel/Orders"));
const ProductListing = React.lazy(() => import("../../../modules/adminPanel/Admin/Listing"));
const AddProduct = React.lazy(() => import("../../../modules/adminPanel/Admin/AddEditProduct"));
const EditProduct = React.lazy(() => import("../../../modules/adminPanel/Admin/EditProduct"));
const DeleteProduct = React.lazy(() => import("../../../modules/adminPanel/Admin/DeleteProduct"));
const LogInformation = React.lazy(() => import("../../../modules/adminPanel/Admin/LogTable"));
const ErrorLogInformation = React.lazy(() => import("../../../modules/adminPanel/Admin/errorLogTable"));

// Admin route configuration
export const adminConfig = [
  {
    path: "/apps/admin/orders",
    element: <Orders />, // Orders Page
  },
  {
    path: "/apps/admin/technician-listing",
    element: <ProductListing />, // Product Listing Page
  },
  {
    path: "/apps/admin/add-products",
    element: <AddProduct />, // Add Product Page
  },
  {
    path: "/apps/admin/edit-products/:id",
    element: <EditProduct />, // Edit Product Page (with dynamic parameter `id`)
  },
  {
    path: "/apps/admin/delete-products/:id",
    element: <DeleteProduct />, // Edit Product Page (with dynamic parameter `id`)
  },
  {
    path: "/apps/admin/logs",
    element: <LogInformation />, // Logs Page
  },
  {
    path: "/apps/admin/error/logs",
    element: <ErrorLogInformation />, // Error Logs Page
  },
];

const AdminRoutes = () => {
  return (
    <Suspense fallback={<Spin/>}>
      <Routes>
        {adminConfig.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;