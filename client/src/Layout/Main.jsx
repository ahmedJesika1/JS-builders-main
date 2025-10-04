import { Outlet } from "react-router-dom";
import NavBar from "../shared/NavBar/NavBar";
import ScrollToBottomToTop from "../utilits/ScrollToBottomToTop";
import Footer from "../shared/Footer/Footer";
import MessengerBtn from "../shared/MessengerBtn/MessengerBtn";

const Main = () => {
  return (
    <div className="overflow-hidden">
      <MessengerBtn/>
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
      <ScrollToBottomToTop></ScrollToBottomToTop>
    </div>
  );
};

export default Main;
