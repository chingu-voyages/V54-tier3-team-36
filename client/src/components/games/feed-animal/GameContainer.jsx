import React from 'react';


const GameContainer = ({ children }) => {
    return (
        <div
            className="
                w-full
                max-w-[98%]
                min-h-[800px]
                mx-auto
                mt-8
                rounded-3xl
                shadow-2xl
                flex
                flex-col
                items-center
                justify-center
                relative
                bg-cover
                bg-center
            "
        >
            <div className="w-full h-full flex flex-col items-center justify-center rounded-3xl p-8">
                {children}
            </div>
        </div>
    );
};

export default GameContainer;
