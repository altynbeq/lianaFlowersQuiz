// src/components/AvatarStartPage.jsx

import React, { useState, useRef } from "react";
import one from "../assets/avatars/1.webp";
import two from "../assets/avatars/2.webp";
import three from "../assets/avatars/3.jpg";
import four from "../assets/avatars/4.webp";
import five from "../assets/avatars/5.jpg";
import six from "../assets/avatars/6.webp";
import logo from "../assets/logo.svg";
import axios from "axios"; // Ensure axios is installed
import imageCompression from "browser-image-compression"; // Ensure this is installed

const avatarImages = [one, two, three, four, five, six];

const AvatarStartPage = ({ onPhotoUploadDone, gender }) => {
  const [images, setImages] = useState(Array(6).fill(null));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [uploadedPhoto, setUploadedPhoto] = useState(null); // This will be the File object
  const [previewUrl, setPreviewUrl] = useState(null); // For image preview
  const fileInputRef = useRef(null);

  function getRandomAvatarOption(gender) {
    // Find the object matching the provided gender
    const genderGroup = avatarOptions.find(option => option.gender.toLowerCase() === gender.toLowerCase());
  
    if (!genderGroup) {
      throw new Error(`No avatar options found for gender: ${gender}`);
    }
  
    const { options } = genderGroup;
  
    if (!options || options.length === 0) {
      throw new Error(`No avatar options available for gender: ${gender}`);
    }
  
    // Generate a random index to select an option
    const randomIndex = Math.floor(Math.random() * options.length);
  
    // Return the selected option
    return options[randomIndex];
  }


  const openInitialModal = () => {
    setIsModalOpen(true);
    setIsPhotoModalOpen(false);
    setUploadedPhoto(null);
    setPreviewUrl(null);
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
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    fileInputRef.current.click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Optional: Validate file type and size here

    setUploadedPhoto(file);
    setPreviewUrl(URL.createObjectURL(file)); // Create a preview URL
    openPhotoModal();
  };

  const avatarOptions = [
    {
      gender: 'female',
      options: [
        {
          imageUrl: 'https://www.reddit.com/media?url=https%3A%2F%2Fpreview.redd.it%2Fnew-ai-portraits-v0-hml85w4ou7na1.jpg%3Fwidth%3D1024%26format%3Dpjpg%26auto%3Dwebp%26s%3Df6418cb61a9d1e3a3a3e5d4407e492d8faf82c36',
          description: 'Beautiful woman under the water',
          textPrompt: 'Create a stunning, animated 3D portrait of a beautiful woman submerged underwater. Emphasize graceful, flowing movements and serene expressions, highlighting her natural beauty and elegance. Incorporate realistic water effects, such as light refractions and gentle waves, to enhance the immersive underwater atmosphere. Use a harmonious color palette with shades of blue and aqua to evoke a sense of tranquility and depth.'
        },
        {
          imageUrl: 'https://www.zmo.ai/wp-content/uploads/2023/11/Snip20230914_263-min.webp',
          description: 'Beautiful woman in garden with a hat of flowers on her head',
          textPrompt: 'Design a captivating, animated 3D portrait of a beautiful woman standing in a lush garden. She is wearing a stylish hat adorned with vibrant flowers, adding a touch of elegance and nature-inspired charm. Highlight her graceful posture and serene smile, with soft sunlight filtering through the foliage. Use rich, vivid colors to bring the garden to life, creating a harmonious and enchanting scene.'
        },
        {
          imageUrl: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/89553a83-34ab-4928-aca4-46fea7290629/dfuupe9-85d15fbf-c04e-4212-9f02-a9fd17b2120d.jpg/v1/fill/w_784,h_1020,q_70,strp/ai_portraits_1904005_by_ai_portraits_dfuupe9-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTMzMiIsInBhdGgiOiJcL2ZcLzg5NTUzYTgzLTM0YWItNDkyOC1hY2E0LTQ2ZmVhNzI5MDYyOVwvZGZ1dXBlOS04NWQxNWZiZi1jMDRlLTQyMTItOWYwMi1hOWZkMTdiMjEyMGQuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.-P0peyOIqr6I-gKFEmVnhRzKPl4Da_RPwEIT-98iOgE',
          description: 'Woman on a beach with an animated style background',
          textPrompt: 'Generate an animated 3D portrait of a woman on a beach, with a serene ocean backdrop. Capture her relaxed and joyful expression as she enjoys the coastal environment. Incorporate dynamic elements like gentle waves, soft sand textures, and a clear sky to enhance the beach atmosphere. Utilize a vibrant and harmonious color scheme to emphasize the beauty and tranquility of the scene.'
        }
      ]
    },
    {
      gender: 'male',
      options: [
        {
          imageUrl: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/89553a83-34ab-4928-aca4-46fea7290629/dfuupe9-85d15fbf-c04e-4212-9f02-a9fd17b2120d.jpg/v1/fill/w_784,h_1020,q_70,strp/ai_portraits_1904005_by_ai_portraits_dfuupe9-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTMzMiIsInBhdGgiOiJcL2ZcLzg5NTUzYTgzLTM0YWItNDkyOC1hY2E0LTQ2ZmVhNzI5MDYyOVwvZGZ1dXBlOS04NWQxNWZiZi1jMDRlLTQyMTItOWYwMi1hOWZkMTdiMjEyMGQuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.-P0peyOIqr6I-gKFEmVnhRzKPl4Da_RPwEIT-98iOgE',
          description: 'Man in a gardener costume with flowers around him',
          textPrompt: 'Create an animated 3D portrait of a man dressed in a detailed gardener costume, surrounded by an array of colorful flowers. Highlight his passion for gardening with elements like gloves, a tool belt, and a hat adorned with blossoms. Capture a friendly and approachable expression, emphasizing his connection with nature. Use a lively color palette to bring out the richness of the garden environment, including lush greenery and vibrant floral arrangements.'
        },
        {
          imageUrl: 'https://www.reddit.com/media?url=https%3A%2F%2Fpreview.redd.it%2Fphotorealistic-ai-portraits-v0-qyzovi9dyvl91.png%3Fwidth%3D1080%26crop%3Dsmart%26auto%3Dwebp%26s%3D89994aa9913376b2ae483661a9515b554bb003cc',
          description: 'Man in a gardener costume with flowers around him',
          textPrompt: 'Design an animated 3D portrait of a man in a gardener costume, surrounded by an abundance of vibrant flowers. Focus on intricate costume details such as pockets, tools, and a hat with floral accents. Portray a dedicated and cheerful demeanor, reflecting his love for gardening. Incorporate rich textures and a vibrant setting to showcase a flourishing garden in the background, enhancing the overall lively and natural feel.'
        },
        {
          imageUrl: 'https://i.pinimg.com/originals/a4/dd/eb/a4ddeb7cf4b9559188464c21f1e090c0.png',
          description: 'Man in a warrior costume',
          textPrompt: 'Generate an animated 3D portrait of a man clad in an impressive warrior costume. Emphasize strong and heroic features, with armor adorned with intricate designs and weaponry that highlights his prowess. Capture a determined and fearless expression, embodying the essence of a seasoned warrior. Use bold and contrasting colors to enhance the armor’s details and create a striking visual impact, set against a dynamic background that complements the warrior theme.'
        }
      ]
    }
  ];
  
  const deletePhoto = () => {
    setUploadedPhoto(null);
    setPreviewUrl(null);
    setIsPhotoModalOpen(false);
    openFileDialog();
  };

  const handleDoneClick = async () => {
    closePhotoModal();

    if (uploadedPhoto && onPhotoUploadDone) {
      try {
        // Step 1: Compress the image (Optional but recommended)
        const options = {
          maxSizeMB: 1, // Maximum size in MB
          maxWidthOrHeight: 1024, // Max width or height
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(uploadedPhoto, options);

        // Step 2: Upload the image to Cloudinary using environment variables
        const cloudName = 'dzzldqqsc';
        const uploadPreset = 'user_photos';

        const formData = new FormData();
        formData.append("file", compressedFile);
        formData.append("upload_preset", uploadPreset);

        const cloudinaryResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        );

        const uploadedImageUrl = cloudinaryResponse.data.secure_url;
        console.log("Uploaded Image URL:", uploadedImageUrl);
          const randomStyles = getRandomAvatarOption(gender);
        // Step 3: Send the public URL to the Netlify Function
        const response = await fetch("/.netlify/functions/sendPhotos", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageUrl: uploadedImageUrl, // Public URL from Cloudinary
            styleImageUrl: randomStyles.imageUrl, // Replace with actual style image URL
            textPrompt: randomStyles.textPrompt
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to send photo");
        }

        const result = await response.json();
        console.log("functionPhotoSendResult:", result);
        console.log("PHOTO SUCCESS");

        // Assuming the API returns { avatarPhotoUrl: 'url_to_generated_avatar' }
        console.log("result.avatarPhotoUrl", result.output);
        onPhotoUploadDone(result.output);
      } catch (error) {
        console.error("Error sending photo:", error);
        // Optionally, inform the user about the error
        alert("Произошла ошибка при отправке фото. Пожалуйста, попробуйте снова.");
        // Optionally, allow the user to retry
      }
    }
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
            {/* Close Icon (Bigger) */}
            <button
              onClick={closeInitialModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl"
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
                Поехали
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Photo Modal */}
      {isPhotoModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-11/12 sm:w-96 relative">
            {/* Close Icon (Bigger) */}
            <button
              onClick={closePhotoModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl"
            >
              &times;
            </button>

            {previewUrl && (
              <div className="text-center mb-6">
                <img
                  src={previewUrl}
                  alt="Uploaded"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            )}
            <div className="flex justify-between mt-6 space-x-2">
              <button
                onClick={deletePhoto}
                className="px-6 py-3 bg-red-500 text-white rounded-full font-bold hover:bg-red-600 transition-all"
              >
                Удалить и переснять
              </button>
              <button
                onClick={handleDoneClick}
                className="px-6 py-3 bg-blue-500 text-white rounded-full font-bold hover:bg-blue-600 transition-all"
              >
                Готово
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarStartPage;
