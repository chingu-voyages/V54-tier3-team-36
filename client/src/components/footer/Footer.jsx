import FooterContent from "./FooterContent";
import FooterBottom from "./FooterBottom";
import animalBackgroundPhoto from "../../assets/animalBackgroundPhoto.png";
import FooterWaves from "./FooterWaves";

function Footer() {
  return (
    <footer
      id="footer"
      className="w-full relative bg-footerBackgroundColor text-emerald-400 dark:bg-gray-900 dark:text-white overflow-hidden bg-cover bg-center"
      style={{
        borderImage: `url(${animalBackgroundPhoto}) 50 stretch`,
        backgroundColor: "#006666"
      }}>
      <FooterWaves />
      <div className="max-w-7xl mx-auto rounded-lg col-span-12 pt-10 relative z-10">
        <div className="w-full mx-auto px-4 sm:px-8">
          <FooterContent />

          <FooterBottom />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
