import React from 'react';

const StatsModal = ({ messages }) => {
    if (!messages?.length) return null;

    return (
        <div className="w-full mt-4">
            <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Game Log</h3>
                <div className="space-y-2">
                    {messages.slice().reverse().map((msg) => (
                        <div 
                            key={msg.id} 
                            className="text-xs p-2 rounded bg-gray-50 border border-gray-100"
                        >
                            <div className="flex justify-between items-center">
                                <span className="font-medium">{msg.text}</span>
                                <span className="text-gray-500 text-xs">{msg.timestamp}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StatsModal;