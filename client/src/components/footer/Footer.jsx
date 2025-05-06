import FooterContent from "./FooterContent";
import FooterBottom from "./FooterBottom";
import FooterWaves from "./FooterWaves";

function Footer() {
  return (
    <footer
      id="footer"
      className="w-[95%] h-auto px-12 mb-10 mx-auto relative text-emerald-400 dark:bg-gray-900 dark:text-white overflow-hidden mt-8"
      style={{
        backgroundColor: "#006666",
        borderRadius: "1.8rem"
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