import farmAnimals from "../../assets/images/footer-images/farmAnimals.png";
import LionPhoto from "../../assets/images/guess-animal-sounds/LionPhoto.png";
import MultipleAnimals from "../../assets/images/footer-images/MultipleAnimals.png";
import safariFun from "../../assets/images/footer-images/safariFun.png";
import safariLand from "../../assets/images/footer-images/safariLand.png";
import panter from "../../assets/images/footer-images/cartoon_panter.png";

function FooterLogos() {
  return (
    <div className="flex justify-center md:justify-end w-full flex-wrap gap-6">
      <img
        src={farmAnimals}
        alt="Farm Animals"
        className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full object-cover opacity-75"
      />
      <img
        src={LionPhoto}
        alt="Lion Photo"
        className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full object-cover opacity-75"
      />
      <img
        src={MultipleAnimals}
        alt="Multiple Animals"
        className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full object-cover opacity-75"
      />
      <img
        src={safariFun}
        alt="Safari Fun"
        className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full object-cover opacity-75"
      />
      <img
        src={safariLand}
        alt="Safari Land"
        className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full object-cover opacity-75"
      />
        <img
            src={panter}
            alt="panter"
            className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full object-cover opacity-75"
        />
    </div>
  );
}

export default FooterLogos;
