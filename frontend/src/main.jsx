import React from 'react';
import ReactDOM from 'react-dom/client';
import Play from './views/Play';
import Login from './views/Login';
import Profile from './views/Profile';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  { path: "spelling-bee-ducks/", element: <Login /> },
  { path: "spelling-bee-ducks/profile", element: <Profile /> },
  { path: "spelling-bee-ducks/play", element: <Play /> },
  ]
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);