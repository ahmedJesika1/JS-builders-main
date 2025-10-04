import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home_pages/Home/Home";

import { Brochure } from "../pages/Brochure/Brochure";
import { Contact } from "../pages/Contact/Contact";
import { GalleryPage } from "../pages/Gallary/Gallary";
import ServiceDetails from "../pages/Services/ServiceDetails/ServiceDetails";
import DetailsLayout from "../Layout/DetailsLayout";
import NotFound from "../pages/NotFound/NotFound";
import { About } from "../pages/Profile/About";
import LandPage from "../pages/Land/Land";
import ApartmentsPage from "../pages/Apartments/Apartments";
import SignUp from "../Layout/SignUp";
import Login from "../Layout/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/gallery", element: <GalleryPage /> },
      { path: "/about", element: <About /> },
      { path: "/profile", element: <Brochure /> },
      { path: "/contact", element: <Contact /> },
      {
        path: "/land",
        element: <LandPage/>,
      },
      {
        path: "/apartments",
        element: <ApartmentsPage/>,
      },
      {
        path: "/service/:id",
        element: <DetailsLayout />,
        children: [
          { path: "", element: <ServiceDetails /> }, // Relative path
        ],
      },
         {
        path: "/signUp",
        element: <SignUp/>,
      },
        {
        path: "/login",
        element: <Login/>,
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
