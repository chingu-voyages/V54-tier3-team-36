import { profiles } from "./footerUserData";
import FooterUserProfiles from "./FooterUserProfiles";
import FooterLogos from "./FooterLogos";

function FooterContent() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full space-y-4 md:space-y-0 md:space-x-4 lg:space-x-8 text-gray-200 pt-2">
      <FooterUserProfiles profiles={profiles} />
      <div className="flex justify-center md:justify-end w-full">
        <FooterLogos />
      </div>
    </div>
  );
}

export default FooterContent;
