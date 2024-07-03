import React from 'react';
import ReactDOM from 'react-dom/client';
import Play from './views/Play';
import Login from './views/Login';
import Profile from './views/Profile';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { UserProvider } from './contexts/UserContext';
import ProtectedRoute from './routes/ProtectedRoute';

import "./index.css";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { 
    path: "/profile", 
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    )
  },
  { 
    path: "/play", 
    element: (
      <ProtectedRoute>
        <Play />
      </ProtectedRoute>
    )
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserProvider>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </UserProvider>
);
