import React from "react";

const GameStatsModal = ({ game, stats, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{game}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          
          {stats.map((stat, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">{stat.label}</span>
              <span className="font-semibold text-gray-900">{stat.value}</span>
            </div>
          ))}

        
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Achievements</h3>
            <div className="space-y-2">
              {stats.achievements?.map((achievement, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <p className="font-medium text-gray-800">{achievement.title}</p>
                    <p className="text-sm text-gray-500">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Unlocked Avatars</h3>
            <div className="grid grid-cols-3 gap-3">
              {stats.avatars?.map((avatar, index) => (
                <div key={index} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                  {avatar.icon}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameStatsModal; 
