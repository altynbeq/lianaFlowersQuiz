// netlify/functions/sendPhotos.js

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

    if (!imageUrl || !styleImageUrl || !textPrompt) {
      console.error('Missing required fields:', { imageUrl, styleImageUrl, textPrompt });
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields: imageUrl, styleImageUrl, textPrompt' }),
      };
    }

    const apiKey = process.env.LIGHTX_API_KEY;
    if (!apiKey) {
      console.error('LIGHTX_API_KEY is not defined');
      throw new Error('LIGHTX_API_KEY is not defined');
    }
    console.log('API_Key:', '***'); // Mask API key for security

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
    
    const secondApi = 'https://api.lightxeditor.com/external/api/v1/order-status';
    
    const finalResponse = await fetch(secondApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify(result.orderId),
    })
    .then(response => {
      if (!response.ok) {
          throw new Error(`Failed to retrieve order status. Status code: ${response.status}, Response: ${response.statusText}`);
      }
      console.log("AvatarResponse:", response);
      return response.json();
      })
      .then(data => {
      console.log("Response:", data);
      })
      .catch(error => {
      console.error("Error:", error.message);
      });

      finalResponse();
    // return {
    //   statusCode: 200,
    //   body: JSON.stringify(result),
    // };
  } catch (error) {
    console.error('Error in sendPhotos function:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', message: error.message }),
    };
  }
};