import {techStack} from "./techUserData.js";

function FooterLogos() {
    const getHoverColorClass = (color) => {
        const colorMap = {
            cyan: "group-hover:shadow-cyan-400/30 group-hover:border-cyan-400/50",
            blue: "group-hover:shadow-blue-400/30 group-hover:border-blue-400/50",
            green: "group-hover:shadow-green-400/30 group-hover:border-green-400/50",
            purple: "group-hover:shadow-purple-400/30 group-hover:border-purple-400/50",
            yellow: "group-hover:shadow-yellow-400/30 group-hover:border-yellow-400/50",
            orange: "group-hover:shadow-orange-400/30 group-hover:border-orange-400/50",
            red: "group-hover:shadow-red-400/30 group-hover:border-red-400/50",
            gray: "group-hover:shadow-gray-400/30 group-hover:border-gray-400/50"
        };
        return colorMap[color] || "group-hover:shadow-gray-400/30 group-hover:border-gray-400/50";
    };

    return (
        <div className="w-full">
            <div
                className="box1 px-2 sm:px-4 md:px-8 mt-4 sm:mt-8 md:mt-22 w-full rounded-xl sm:rounded-2xl md:rounded-3xl pt-4 sm:pt-6 md:pt-8 pb-4 sm:pb-6 md:pb-8 p-2 sm:p-4 md:p-[20px] bg-footerUserProfiles dark:bg-gray-900 dark:text-white">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 md:gap-6">
                    {techStack.map((tech, index) => (
                        <div key={index} className="flex flex-col items-center group">
                            <div
                                className={`w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-lg bg-white/60 backdrop-blur-sm border border-gray-300/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg group-hover:bg-white/80 p-2 sm:p-3 ${getHoverColorClass(tech.color)}`}>
                                <img
                                    src={tech.image}
                                    alt={tech.alt}
                                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <span
                                className="text-xs text-gray-300 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium text-center">
                                {tech.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FooterLogos;