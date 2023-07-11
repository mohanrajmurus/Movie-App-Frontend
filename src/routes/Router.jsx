import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Layout from "../pages/Layout"
import HomePage from "../pages/HomePage"
import React from "react"
import MovieDetailsPage from "../pages/MovieDetailsPage"
import PostMovieDetails from "../pages/admin/PostMovieDetails"
import DeleteMovie from "../pages/admin/DeleteMovie"
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
          path: "movie/:id",
          element: <MovieDetailsPage />,
        },
        {
          path: "admin",
          children: [
            {
              index: true,
              element: <PostMovieDetails />,
            },
            {
              path: "movie",
              element: <DeleteMovie />,
            },
          ],
        },
      ],
    },
  ])
  return <RouterProvider router={router} />
}

export default Router
