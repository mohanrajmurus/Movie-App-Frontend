import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import HomePage from "../pages/HomePage";
import React from "react";
import MovieDetailsPage from '../pages/MovieDetailsPage'
import PostMovieDetails from "../pages/PostMovieDetails";
const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
            path:'/movie/:id',
            element:<MovieDetailsPage/>
        },
        {
          path:'/admin',
          element:<PostMovieDetails/>
        }
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Router;
