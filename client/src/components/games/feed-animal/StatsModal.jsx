import React from 'react';

const StatsModal = ({ messages = [] }) => {
    if (!messages.length) {
        return (
            <div className="text-sm text-gray-500 italic p-2">
                No messages yet. Start playing to see game logs.
            </div>
        );
    }

    return (
        <div className="space-y-1.5">
            {messages.map((msg) => (
                <div 
                    key={msg.id} 
                    className="text-xs p-2 bg-gray-50 rounded border border-gray-100 hover:bg-gray-100 transition-colors"
                >
                    <div className="flex justify-between items-start">
                        <span className="flex-1 pr-2">{msg.text}</span>
                        <span className="text-gray-400 text-2xs whitespace-nowrap">
                            {msg.timestamp}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsModal;