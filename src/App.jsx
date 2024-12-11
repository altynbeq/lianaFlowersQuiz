import React, { useState } from "react";
import logo from "./assets/logo.svg"; // Import your company logo
import gif from "./assets/main.gif"; // Import your GIF
import { FlowerPersonalityQuiz } from "./components/FlowerPersonalityQuiz";
import BlossomScene from "./components/ui/flowersFall/FlowersFall"; // Import the BlossomScene component

const App = () => {
  const [gender, setGender] = useState(false);

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
  };

  return (
    <div className="min-h-screen subtle-border border-gray-100 bg-white flex flex-col items-center justify-center relative">
      <BlossomScene />

      {!gender ? (
        <div className="bg-white subtle-border shadow-lg rounded-lg p-6 w-11/12 max-w-md relative z-10">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="Company Logo" className="h-16" />
          </div>
          <h1 className="text-xl font-semibold text-center mb-4">
            Выберите ваш пол
          </h1>
          <div className="flex justify-center mb-6">
            <img src={gif} alt="Gender Selection" className="h-32 w-auto" />
          </div>
          <div className="flex justify-around">
            <button
              className="bg-transparent text-pink-500 border-2 border-pink-500 px-6 py-2 rounded-2xl hover:bg-pink-500 hover:text-white transition-all duration-300"
              onClick={() => handleGenderSelect("female")}
            >
              Женский
            </button>
            <button
              className="bg-transparent text-blue-500 border-2 border-blue-500 px-6 py-2 rounded-2xl hover:bg-blue-500 hover:text-white transition-all duration-300"
              onClick={() => handleGenderSelect("male")}
            >
              Мужской
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white subtle-border shadow-lg rounded-lg p-6 w-11/12 max-w-xl relative z-10">
          <div className="flex justify-center mb-4">
            <img src={logo} alt="Company Logo" className="h-16" />
          </div>
          <FlowerPersonalityQuiz gender={gender} />
        </div>
      )}
    </div>
  );
};

export default App;
