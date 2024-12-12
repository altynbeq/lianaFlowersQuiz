// src/App.js

import React, { useState } from "react";
import { FlowerPersonalityQuiz } from "./components/FlowerPersonalityQuiz";
import BlossomScene from "./components/ui/flowersFall/FlowersFall";
import GenderSelection from "./components/GenderSelection";
import AvatarStartPage from "./components/AvatarsStartPage";

const App = () => {
  const [gender, setGender] = useState(null); // Changed initial state to null for clarity
  const [avatarFinished, setAvatarFinished] = useState(false);
  const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);
  const [avatarPhotoUrl, setAvatarPhotoUrl] = useState(null); // New state to store the avatar photo URL

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
  };

  const handlePhotoUploadDone = (photoUrl) => {
    console.log("photoUrl", photoUrl)
    if (photoUrl) {
      console.log("Photo uploaded successfully:", photoUrl);
      setAvatarPhotoUrl(photoUrl);
      setIsPhotoUploaded(true);
    } else {
      // Handle the case where photoUrl is null or undefined
      alert("Не удалось получить аватар. Пожалуйста, попробуйте снова.");
    }
  };

  const closePhotoUploadedModal = () => {
    // After acknowledging the "photo was sent" modal, set avatarFinished to true
    setAvatarFinished(true);
    setIsPhotoUploaded(false);
  };

  return (
    <div className="min-h-screen min-w-screen subtle-border border-gray-100 bg-white flex flex-col items-center justify-center relative">
      <BlossomScene />
      <div>
        {avatarFinished ? (
          !gender ? (
            <GenderSelection onGenderSelect={handleGenderSelect} />
          ) : (
            <div className="bg-transparent h-fit flex justify-center align-center rounded-lg p-2 m-5 relative z-10">
              {/* Pass the avatarPhotoUrl to FlowerPersonalityQuiz */}
              <FlowerPersonalityQuiz gender={gender} avatarPhotoUrl={avatarPhotoUrl} />
            </div>
          )
        ) : (
          <div className="p-6 w-[100%] z-20 relative">
            <AvatarStartPage onPhotoUploadDone={handlePhotoUploadDone} gender={gender} />
          </div>
        )}
      </div>

      {/* Modal to show that photo was sent and now user must answer questions */}
      {isPhotoUploaded && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-11/12 sm:w-96 relative">
            <h3 className="text-xl font-bold text-center mb-4 text-gray-800">
              Фото отправлено!
            </h3>
            <p className="text-center text-gray-700 mb-6">
              Теперь ответьте на несколько вопросов о себе, чтобы мы создали аватар, соответствующий вашей личности.
            </p>
            <div className="flex justify-center">
              <button
                onClick={closePhotoUploadedModal}
                className="px-6 py-3 bg-blue-500 text-white rounded-full font-bold hover:bg-blue-600 transition-all"
              >
                Продолжить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
