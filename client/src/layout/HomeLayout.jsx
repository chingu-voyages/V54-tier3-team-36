import Header from "../components/Header";
import Footer from "../components/footer/Footer";
import NavBar from "../components/NavBar";
import backgroundImage from "../assets/backgroundImage.jpg"


const HomeLayout = () => {
  const pageBg = "bg-white bg-opacity-0"

  return (
    <div className="md:min-h-screen flex items-center justify-center bg-fixed bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})`}}>
      <div className="container mx-auto m-10 p-2 md:m-32 md:p-8 bg-white bg-opacity-75 rounded-[3vw] overflow-hidden">
        <NavBar bgColor={pageBg}/>
        <Header />
        <div className="flex md:flex-row flex-col space-y-4 md:space-x-10 p-4 md:p-10">
          <div className="text-black text-wrap">
            <h2 className="text-balance font-bold text-3xl">sub description.</h2>
            <p className="text-lg">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, perferendis inventore tempora tenetur, veritatis eos facilis quo commodi aliquid autem nemo numquam! Beatae non tenetur odit odio esse in ab?</p>
          </div>
          <div className="text-black text-wrap">
            <h2 className="text-balance font-bold text-3xl">sub description1.</h2>
            <p className="text-lg">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, perferendis inventore tempora tenetur, veritatis eos facilis quo commodi aliquid autem nemo numquam! Beatae non tenetur odit odio esse in ab?</p>
          </div>
          <div className="text-black text-wrap">
            <h2 className="text-balance font-bold text-3xl">sub description2.</h2>
            <p className="text-lg">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum, perferendis inventore tempora tenetur, veritatis eos facilis quo commodi aliquid autem nemo numquam! Beatae non tenetur odit odio esse in ab?</p>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default HomeLayout;
