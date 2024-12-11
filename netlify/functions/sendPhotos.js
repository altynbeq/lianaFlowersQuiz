// netlify/functions/sendPhoto.js

const fetch = require('node-fetch'); // Ensure node-fetch is installed

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const { imageUrl, styleImageUrl, textPrompt } = JSON.parse(event.body);

    const apiKey = process.env.LIGHTX_API_KEY; // Securely store your API key

    const apiUrl = 'https://api.lightxeditor.com/external/api/v1/avatar';

    const data = {
      imageUrl,
      styleImageUrl,
      textPrompt,
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: errorText }),
      };
    }

    const result = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error('Error in sendPhoto function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
