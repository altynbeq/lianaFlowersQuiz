// netlify/functions/sendPhoto.js

const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  console.log('Received event:', event);

  if (event.httpMethod !== 'POST') {
    console.log('Method not allowed:', event.httpMethod);
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    console.log('Parsing request body...');
    const { imageUrl, styleImageUrl, textPrompt } = JSON.parse(event.body);
    console.log('Parsed body:', { imageUrl, styleImageUrl, textPrompt });

    const apiKey = process.env.LIGHTX_API_KEY;
    if (!apiKey) {
      console.error('LIGHTX_API_KEY is not defined');
      throw new Error('LIGHTX_API_KEY is not defined');
    }
    console.log('API_Key:', apiKey);

    const apiUrl = 'https://api.lightxeditor.com/external/api/v1/avatar';
    console.log('External API URL:', apiUrl);

    const data = {
      imageUrl,
      styleImageUrl,
      textPrompt,
    };
    console.log('Data to send to external API:', data);

    console.log('Sending request to external API...');
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(data),
    });
    console.log('Received response from external API with status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('External API Error Response:', errorText);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: errorText }),
      };
    }

    const result = await response.json();
    console.log('External API Response:', result);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error('Error in sendPhoto function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', message: error.message }),
    };
  }
};
