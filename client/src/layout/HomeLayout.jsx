import Header from "../components/Header";
import Footer from "../components/footer/Footer";
import NavBar from "../components/NavBar";
import backgroundImage from "../assets/backgroundImage.jpg"
import { Outlet } from "react-router";


const HomeLayout = () => {
  const pageBg = "bg-white bg-opacity-0"

  return (
    <div className="md:min-h-screen flex items-center justify-center bg-fixed bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})`}}>
      <div className="container mx-auto m-10 p-2 md:m-32 md:p-8 bg-white bg-opacity-75 rounded-[3vw] overflow-hidden">
        <NavBar bgColor={pageBg}/>
        <Outlet/>

        <Footer />
      </div>
    </div>
  );
};

export default HomeLayout;
