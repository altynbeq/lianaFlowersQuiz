import React, { useState, useRef } from "react";
import one from "../assets/avatars/1.webp";
import two from "../assets/avatars/2.webp";
import three from "../assets/avatars/3.jpg";
import four from "../assets/avatars/4.webp";
import five from "../assets/avatars/5.jpg";
import six from "../assets/avatars/6.webp";
import logo from "../assets/logo.svg"; // Import your company logo

const avatarImages = [one, two, three, four, five, six];

const AvatarStartPage = () => {
  const [images, setImages] = useState(Array(6).fill(null));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const fileInputRef = useRef(null);

  const openInitialModal = () => {
    // Clear all states to start fresh
    setIsModalOpen(true);
    setIsPhotoModalOpen(false);
    setUploadedPhoto(null);
  };

  const closeInitialModal = () => {
    setIsModalOpen(false);
  };

  const openPhotoModal = () => {
    setIsModalOpen(false);
    setIsPhotoModalOpen(true);
  };

  const closePhotoModal = () => {
    setIsPhotoModalOpen(false);
  };

  const openFileDialog = () => {
    // Clear the file input value so selecting the same file again triggers onChange
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    fileInputRef.current.click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setUploadedPhoto(reader.result);
      openPhotoModal(); // Ensure the photo modal always opens after upload
    };
    reader.readAsDataURL(file);
  };

  const deletePhoto = () => {
    // Delete photo and immediately prompt for another photo
    setUploadedPhoto(null);
    setIsPhotoModalOpen(false);
    // Reopen the file dialog so the user can retake the photo right away
    openFileDialog();
  };

  return (
    <div className="bg-transparent subtle-border mb-5 z-10 shadow-lg rounded-lg p-4 sm:p-6 w-full min-w-[300px] mx-auto">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      {/* Logo */}
      <div className="flex mt-5 justify-center mb-4">
        <img src={logo} alt="Company Logo" className="h-16" />
      </div>

      {/* Title */}
      <h2 className="text-xl sm:text-sm mt-10 text-center mb-4 sm:mb-6 text-gray-800">
        Пройдите увлекательный тест за 1 минуту и получите уникальный аватар,
        созданный специально для вас!
      </h2>

      <div className="relative mb-5 mt-10 w-[100%] h-64 sm:h-80 flex items-center justify-center">
        {/* Central button */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <button
            onClick={openInitialModal}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-blue-500 text-white text-lg sm:text-xl font-bold 
            flex items-center justify-center hover:bg-blue-600 transition-all 
            shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Начать
          </button>
        </div>

        {/* Circle positions */}
        {[0, 1, 2, 3, 4, 5].map((index) => {
          const angle = (Math.PI * 2 * index) / 6 - Math.PI / 2;
          const radius = window.innerWidth < 640 ? 100 : 150;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <div
              key={index}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
              }}
            >
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <div className="w-20 h-20 gap-2 sm:w-30 sm:h-30 rounded-full bg-gray-100 border-4 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-all">
                  {images[index] ? (
                    <img
                      src={images[index]}
                      alt={`Position ${index}`}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <img
                      src={avatarImages[index]}
                      alt={`Avatar ${index}`}
                      className="w-full h-full object-cover rounded-full"
                    />
                  )}
                </div>
              </label>
            </div>
          );
        })}
      </div>

      {/* Initial Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-11/12 sm:w-96 relative">
            {/* Close Icon */}
            <button
              onClick={closeInitialModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>

            <h3 className="text-xl font-bold text-center mb-4 text-gray-800">
              Сделайте селфи или загрузите фото, чтобы получить аватар!
            </h3>
            <div className="flex justify-center mt-6">
              <button
                onClick={openFileDialog}
                className="px-6 py-3 bg-blue-500 text-white rounded-full font-bold hover:bg-blue-600 transition-all"
              >
                Let's Go
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Photo Modal */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-11/12 sm:w-96 relative">
            {/* Close Icon */}
            <button
              onClick={closePhotoModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>

            {uploadedPhoto && (
              <div className="text-center mb-6">
                <img
                  src={uploadedPhoto}
                  alt="Uploaded"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            )}
            <div className="flex justify-between mt-6">
              <button
                onClick={deletePhoto}
                className="px-6 py-3 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transition-all"
              >
                Delete & Retake
              </button>
              <button
                onClick={closePhotoModal}
                className="px-6 py-3 bg-blue-500 text-white rounded-full font-bold hover:bg-blue-600 transition-all"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarStartPage;
