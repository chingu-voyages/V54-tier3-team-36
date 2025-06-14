import PropTypes from "prop-types";

function FooterUserProfiles({profiles}) {
    return (
        <div
            className="box1 px-8 mt-22 w-full rounded-3xl pt-8 pb-8 p-[20px] bg-footerUserProfiles dark:bg-gray-900 dark:text-white">
            <p className="text-white mb-6 text-lg font-medium">Meet Our Team</p>

            <div className="space-y-4">
                {profiles.map((profile, index) => (
                    <div
                        key={index}
                        className="profile-card group relative overflow-hidden rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-5 transition-all duration-300 ease-out hover:scale-105 hover:shadow-2xl hover:shadow-white/10 hover:border-white/30 hover:bg-gray-800/70 cursor-pointer"
                    >
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-white/5 to-gray-200/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        <div className="relative z-10 flex justify-between items-center">
                            <div className="profile-info">
                                <h2 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors duration-300">
                                    {profile.name}
                                </h2>
                                <p className="text-sm text-gray-300 group-hover:text-gray-100 transition-colors duration-300">
                                    {profile.role}
                                </p>
                            </div>

                            <div className="icon-containers flex items-center space-x-3">
                                <a
                                    href={profile.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-icon-wrapper group/linkedin relative w-10 h-10 flex items-center justify-center rounded-lg bg-gray-600/80 backdrop-blur-sm transition-all duration-300 hover:bg-gray-500 hover:scale-110 hover:shadow-lg hover:shadow-white/20"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <i className="fab fa-linkedin text-lg text-gray-200 group-hover/linkedin:text-white transition-colors duration-300"/>
                                </a>

                                <a
                                    href={profile.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-icon-wrapper group/github relative w-10 h-10 flex items-center justify-center rounded-lg bg-gray-600/80 backdrop-blur-sm transition-all duration-300 hover:bg-gray-500 hover:scale-110 hover:shadow-lg hover:shadow-white/20"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <i className="fab fa-github text-lg text-gray-200 group-hover/github:text-white transition-colors duration-300"/>
                                </a>
                            </div>
                        </div>

                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </div>
                    </div>
                ))}
            </div>
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