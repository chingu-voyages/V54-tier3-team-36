import React from "react";
import {IconCloud} from "./ui/interactive-icon-cloud";

const TechStack = () => {
    const iconSlugs = [
        "react",
        "vite",
        "tailwindcss",
        "reactrouter",
        "zod",
        "axios",
        "nodedotjs",
        "express",
        "mongodb",
        "javascript",
        "typescript",
        "git",
        "html5",
        "css3",
        "npm",
        "visualstudiocode",
        "github",
        "jest",
    ];

    return (
        <div className="w-full py-16 px-6 bg-gradient-to-b from-transparent to-white-50 rounded-lg">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                    Tools & Frameworks Powering This Build
                </h2>

                <div className="flex flex-col lg:flex-row items-center justify-center gap-8 ">
                    <div
                        className="relative flex size-full max-w-3xl items-center justify-center overflow-hidden rounded-lg border backdrop-blur shadow-xl">
                        <IconCloud iconSlugs={iconSlugs} isDark={false}/>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TechStack;