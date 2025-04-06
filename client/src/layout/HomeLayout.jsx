import Header from "../components/Header";
import Footer from "../components/footer/Footer";
import NavBar from "../components/NavBar";
// import background from "../assets/background.jpg"
import backgroundImage from "../assets/backgroundImage.jpg"
import { Outlet } from "react-router";


const HomeLayout = () => {
  const pageBg = "bg-white bg-opacity-0"

  return (
    <div className="md:min-h-screen flex items-center justify-center bg-contain md:bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})`}}>
      <div className="m-10 p-2 md:m-32 md:p-8 bg-white bg-opacity-75 rounded-[3vw] overflow-hidden w-[90%] md:w-[75%]">
        <NavBar bgColor={pageBg}/>
        <Outlet/>

        <Footer />
      </div>
    </div>
  );
};

export default HomeLayout;
