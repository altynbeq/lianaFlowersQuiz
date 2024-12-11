import React, { useState } from "react";
import { FlowerPersonalityQuiz } from "./components/FlowerPersonalityQuiz";
import BlossomScene from "./components/ui/flowersFall/FlowersFall";
import GenderSelection from "./components/GenderSelection";
import AvatarStartPage from "./components/AvatarsStartPage";

const App = () => {
  const [gender, setGender] = useState(false);
  const [avatarFinished, setAvatarFinished] = useState(false);
  const [isPhotoUploaded, setIsPhotoUploaded] = useState(false);
  const [avatarPhotoUrl, setAvatarPhotoUrl] = useState(null); // Store the photo URL here

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
  };

  const handlePhotoUploadDone = (photoUrl) => {
    // photoUrl is what we got from sendPhoto
    // Store it in state
    setAvatarPhotoUrl(photoUrl);

    // Display the "Photo sent" modal
    setIsPhotoUploaded(true);
  };

  const closePhotoUploadedModal = () => {
    // After acknowledging, start the quiz
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
            <AvatarStartPage onPhotoUploadDone={handlePhotoUploadDone} />
          </div>
        )}
      </div>

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
