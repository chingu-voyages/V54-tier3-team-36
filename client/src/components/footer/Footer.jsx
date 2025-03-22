import FooterContent from "./FooterContent";
import FooterBottom from "./FooterBottom";
import animalBackgroundPhoto from "../../assets/animalBackgroundPhoto.png";
import FooterWaves from "./FooterWaves";

function Footer() {
  return (
    <footer
      id="footer"
      className="w-full relative text-emerald-400 dark:bg-gray-900 dark:text-white overflow-hidden"
      style={{
        backgroundColor: "#006666",
        borderRadius: "0.9rem",
        border: "50px solid transparent",
        borderImage: `url(${animalBackgroundPhoto}) 30 round`
      }}>
      <FooterWaves />
      <div className="max-w-7xl mx-auto col-span-12 pt-10 relative z-10">
        <div className="w-full mx-auto px-4 sm:px-8 rounded-lg">
          <FooterContent />
          <FooterBottom />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
