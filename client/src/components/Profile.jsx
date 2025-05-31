import React from "react";

const Profile = () => (
  <div className="w-full max-w-7xl bg-white rounded-3xl shadow-xl p-6 md:p-10 my-8">
    <div className="flex items-center space-x-4 mb-8">
      <div className="w-16 h-16 rounded-full border-2 border-green-300 flex items-center justify-center text-lg font-semibold text-gray-400">
        Avatar
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-800 leading-tight">User Name</h2>
        <p className="text-gray-500 text-sm">example.com</p>
      </div>
    </div>

    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
     
      <div className="bg-green-100 rounded-xl p-6">
        <h3 className="font-bold text-lg text-gray-800 mb-2">Animal Puzzle</h3>
        <div className="space-y-1 text-gray-700">
          <div className="flex justify-between"><span>Total tries:</span> <span>—</span></div>
          <div className="flex justify-between"><span>Lowest moves:</span> <span>—</span></div>
          <div className="flex justify-between"><span>Highest moves:</span> <span>—</span></div>
        </div>
      </div>
     
      <div className="bg-green-100 rounded-xl p-6">
        <h3 className="font-bold text-lg text-gray-800 mb-2">Guess the Animal Sound</h3>
        <div className="space-y-1 text-gray-700">
          <div className="flex justify-between"><span>Wins:</span> <span className="text-gray-500">—</span></div>
          <div className="flex justify-between"><span>Tokens:</span> <span className="text-gray-500">—</span></div>
          <div className="flex justify-between"><span>Trophy:</span> <span className="text-gray-500">—</span></div>
        </div>
      </div>
      
      <div className="bg-green-100 rounded-xl p-6">
        <h3 className="font-bold text-lg text-gray-800 mb-2">Animal Memory Game</h3>
        <div className="space-y-1 text-gray-700">
          <div className="flex justify-between"><span>Tries:</span> <span className="text-gray-500">—</span></div>
          <div className="flex justify-between"><span>Completed:</span> <span className="text-gray-500">—</span></div>
          <div className="flex justify-between"><span>Completed without losing all lives:</span> <span className="text-gray-500">—</span></div>
        </div>
      </div>
     
      <div className="bg-green-100 rounded-xl p-6">
        <h3 className="font-bold text-lg text-gray-800 mb-2">Animal Quiz</h3>
        <div className="space-y-1 text-gray-700">
          <div className="flex justify-between"><span>Correct answers:</span> <span className="text-gray-500">—</span></div>
          <div className="flex justify-between"><span>Completed:</span> <span className="text-gray-500">—</span></div>
        </div>
      </div>
    </div>

    
    <div>
      <h4 className="font-bold text-lg text-gray-800 mb-1">Unlocked Avatars</h4>
      <p className="text-gray-400">No avatars unlocked.</p>
    </div>

    
    <div className="mb-4">
      <h4 className="font-bold text-lg text-gray-800 mb-1">Achievements</h4>
      <p className="text-gray-400">No achievements yet.</p>
    </div>
  </div>
);

export default Profile;
