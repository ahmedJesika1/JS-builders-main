import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import MainLayout from "./layout/MainLayout";
import { Provider } from "react-redux";
import { store } from "./store";
import Banners from "./pages/Banners";
import AboutUs from "./pages/AboutUs";
import Brochure from "./pages/Brochure";
import Contact from "./pages/Contact";
import Experience from "./pages/Experience";
import Gallery from "./pages/Gallery";
import Video from "./pages/Video";
import OurValues from "./pages/OurValues";
import Service from "./pages/Service";
import Login from "./layout/Login";
import Profile from "./pages/Profile";
import ForgotPassword from "./layout/ForgotPassword";
import ResetPassword from "./layout/ResetPassword";
import Teams from "./pages/Teams";
import Careers from "./pages/Careers";
import JobApplicants from "./pages/JobApplicant";
import LatestGallerys from "./pages/LatestGallery";
import Client from "./pages/Client";
import AmenityManager from "./pages/AmenityManager";
import Users from "./pages/Users";
import FeaturedManager from "./pages/FeaturedManager";
import ClientsMessage from "./pages/ClientsMessage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
  {
    path: "/dashboard",
    element: <MainLayout />,
    children: [
      { path: "banners", element: <Banners /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "brochure", element: <Brochure /> },
      { path: "contact", element: <Contact /> },
      { path: "client", element: <ClientsMessage /> },
      { path: "amenity", element: <AmenityManager /> },
      { path: "featured", element: <FeaturedManager /> },
      // { path: "development-process", element: <DevelopmentProcess /> },
      { path: "experience", element: <Experience /> },
      { path: "gallery", element: <Gallery /> },
      { path: "latest-gallery", element: <LatestGallerys /> },
      { path: "video", element: <Video /> },
      { path: "our-values", element: <OurValues /> },
      { path: "service", element: <Service /> },
      { path: "profile", element: <Profile /> },
      // { path: "publications", element: <Publications /> },
      // { path: "news", element: <Blogs /> },
      // { path: "events", element: <Events /> },
      { path: "careers", element: <Careers /> },
      { path: "our-team", element: <Teams /> },
      { path: "our-client", element: <Client /> },
      { path: "job-applicants", element: <JobApplicants /> },
      { path: "visitors", element: <Users /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
