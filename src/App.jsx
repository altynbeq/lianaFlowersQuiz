import React, { useState } from "react";
import { FlowerPersonalityQuiz } from "./components/FlowerPersonalityQuiz";
import BlossomScene from "./components/ui/flowersFall/FlowersFall";
import GenderSelection from "./components/GenderSelection";
import AvatarStartPage from './components/AvatarsStartPage'

const App = () => {
  const [gender, setGender] = useState(false);
  const [avatarFinished, setAvatarFinished] = useState(false);

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
  };

  return (
    <div className="min-h-screen min-w-screen subtle-border border-gray-100 bg-white flex flex-col items-center justify-center relative">
      <BlossomScene />
      <div>
        {avatarFinished ? (
          !gender ? (
            <GenderSelection onGenderSelect={handleGenderSelect} />
          ) : (
            <div className="bg-white subtle-border shadow-lg rounded-lg p-6 w-11/12 max-w-xl relative z-10">
              <FlowerPersonalityQuiz gender={gender} />
            </div>
          )
        ) : (
          <div className="p-6 w-[100%] z-20 relative">
          <AvatarStartPage />
        </div>
        
        )}
      </div>
    </div>

  );
};

export default App;
