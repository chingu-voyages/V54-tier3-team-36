import React from 'react';

const Lives = ({lives}) => (
    <div className="absolute top-4 right-4">
        <p className="text-lg font-medium text-black">Lives: {lives}</p>
    </div>
);

export default Lives;
