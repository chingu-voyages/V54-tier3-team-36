import {profiles} from "./footerUserData";
import FooterUserProfiles from "./FooterUserProfiles";
import FooterLogos from "./FooterLogos";

function FooterContent() {
    return (
        <div
            className="flex flex-col lg:flex-row justify-between items-stretch w-full space-y-6 lg:space-y-0 lg:space-x-8 text-gray-200 pt-2">
            <div className="w-full lg:w-1/2 flex-shrink-0">
                <FooterUserProfiles profiles={profiles}/>
            </div>
            <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end">
                <FooterLogos/>
            </div>
        </div>
    );
}

export default FooterContent;
