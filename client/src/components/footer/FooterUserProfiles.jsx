import PropTypes from "prop-types";

function FooterUserProfiles({ profiles }) {
  return (
    <div
      className="box1 px-8 mt-22 w-full md:w-1/3 rounded-3xl pt-8 pb-8 p-[20px] bg-footerUserProfiles
      dark:bg-gray-900 dark:text-white">
      {profiles.map((profile, index) => (
        <div
          key={index}
          className="profile-info flex justify-between items-center">
          <div className="firstNameContainer mb-6">
            <h2 className="text-lg text-white">{profile.name}</h2>
            <p className="text-xs text-white">{profile.role}</p>
          </div>
          <div className="icon-containers flex items-center space-x-4">
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group">
              <i className="fab fa-linkedin text-3xl h-8 text-footerWhiteColor group-hover:text-footerLinkedinHoverColor" />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group">
              <i className="fab fa-github text-3xl h-8 text-footerWhiteColor group-hover:text-gray-600" />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}

FooterUserProfiles.propTypes = {
  profiles: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      linkedin: PropTypes.string.isRequired,
      github: PropTypes.string.isRequired
    })
  ).isRequired
};

export default FooterUserProfiles;
