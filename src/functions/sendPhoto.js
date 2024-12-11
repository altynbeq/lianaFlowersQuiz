// sendPhoto.js (example)
export async function sendPhoto(imageBase64) {
    const url = 'https://api.lightxeditor.com/external/api/v1/avatar';
    const apiKey = '2d4c569d70554aa5ad4b725bcdf61486_ca1e00d41af847d6bdf36a1668243dd7_andoraitools'; // Replace with your actual API key
  
    const data = {
      imageUrl: imageBase64, // Using the base64 uploaded photo
      styleImageUrl: "https://example.com/your-style-image.jpg", // Replace with your style image URL
      textPrompt: "YourInputPrompt", // Prompt if needed
    };
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(data),
    };
  
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Request failed with status code ${response.status}`);
    }
    const result = await response.json();
  
    // Assume the result contains a field "avatarPhotoUrl" with the generated photo
    return result.avatarPhotoUrl; 
  }
  