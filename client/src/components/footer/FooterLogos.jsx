import farmAnimals from "../../assets/farmAnimals.png";
import LionPhoto from "../../assets/LionPhoto.png";
import MultipleAnimals from "../../assets/MultipleAnimals.png";
import safariFun from "../../assets/safariFun.png";
import safariLand from "../../assets/safariLand.png";

function FooterLogos() {
  return (
    <div className="flex justify-center md:justify-end w-full flex-wrap gap-6">
      <img
        src={farmAnimals}
        alt="Farm Animals"
        className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full object-cover"
      />
      <img
        src={LionPhoto}
        alt="Lion Photo"
        className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full object-cover"
      />
      <img
        src={MultipleAnimals}
        alt="Multiple Animals"
        className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full object-cover"
      />
      <img
        src={safariFun}
        alt="Safari Fun"
        className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full object-cover"
      />
      <img
        src={safariLand}
        alt="Safari Land"
        className="w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full object-cover"
      />
    </div>
  );
}

export default FooterLogos;
