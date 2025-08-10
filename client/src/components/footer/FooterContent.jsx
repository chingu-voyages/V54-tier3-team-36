import {profiles} from "./footerUserData";
import FooterUserProfiles from "./FooterUserProfiles";

function FooterContent() {
    return (
        <div className="w-full text-gray-200 pt-2 px-1 sm:px-4 lg:px-0">
            <FooterUserProfiles profiles={profiles}/>
        </div>
    );
}

export default FooterContent;
