import { useEffect } from "react";
import TabTitle from "../../../utilits/TabTitle";
import About from "../About/About";
// import DevelopmentProcess from "../DevelopmentProcess/DevelopmentProcess";
import Banner from "../banner/Banner";
import Land from "../Land/Land";
import Apartments from "../Apartments/Apartments";
// import Values from "../Values/Values";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <TabTitle title={"Home"}></TabTitle>
      <Banner />
      <About />
      <Apartments/>
      {/* <Values /> */}
      <Land />
      {/* <DevelopmentProcess /> */}
    </div>
  );
};

export default Home;
