// src/App.js

import React, { useState } from "react";
import { FlowerPersonalityQuiz } from "./components/FlowerPersonalityQuiz";
import BlossomScene from "./components/ui/flowersFall/FlowersFall";
import GenderSelection from "./components/GenderSelection";
import AvatarStartPage from "./components/AvatarsStartPage";

const App = () => {
  // State to store selected gender
  const [gender, setGender] = useState(null);

  // State to indicate if avatar generation is finished
  const [avatarFinished, setAvatarFinished] = useState(false);

  // State to control the visibility of the photo upload modal
  const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);

  // State to store the URL of the generated avatar
  const [avatarPhotoUrl, setAvatarPhotoUrl] = useState(null);

  /**
   * Handles the selection of gender.
   * @param {string} selectedGender - The gender selected by the user ('male' or 'female').
   */
  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
  };

  /**
   * Handles the completion of photo upload.
   * @param {string} photoUrl - The URL of the uploaded/generated avatar photo.
   */
  const handlePhotoUploadDone = (photoUrl) => {
    console.log("photoUrl", photoUrl);
    if (photoUrl) {
      console.log("Photo uploaded successfully:", photoUrl);
      setAvatarPhotoUrl(photoUrl);
      setIsPhotoUploaded(true);
      setAvatarFinished(true); // Indicate that avatar generation is complete
    } else {
      // Handle cases where photoUrl is null or undefined
      alert("Не удалось получить аватар. Пожалуйста, попробуйте снова.");
    }
  };

  /**
   * Closes the photo uploaded modal and proceeds to the quiz.
   */
  const closePhotoUploadedModal = () => {
    // After acknowledging the "photo was sent" modal, transition to the quiz
    setAvatarFinished(true);
    setIsPhotoUploaded(false);
  };

  return (
    <div className="min-h-screen min-w-screen subtle-border border-gray-100 bg-white flex flex-col items-center justify-center relative">
      <BlossomScene />
      <div>
        {/* Conditional Rendering Based on Current State */}
        {!gender ? (
          // Step 1: Gender Selection
          <GenderSelection onGenderSelect={handleGenderSelect} />
        ) : !avatarFinished ? (
          // Step 2: Avatar Upload
          <div className="p-6 w-[100%] z-20 relative">
            <AvatarStartPage onPhotoUploadDone={handlePhotoUploadDone} gender={gender} />
          </div>
        ) : (
          // Step 3: Personality Quiz
          <div className="bg-transparent h-fit flex justify-center items-center rounded-lg p-2 m-5 relative z-10">
            {/* Pass the avatarPhotoUrl to FlowerPersonalityQuiz */}
            <FlowerPersonalityQuiz gender={gender} avatarPhotoUrl={avatarPhotoUrl} />
          </div>
        )}
      </div>

      {/* Modal to Indicate Photo Upload Completion */}
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
