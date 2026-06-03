export const searchPollinationsText = async (prompt) => {
  try {
    // Encode the prompt to handle spaces and special characters
    const encodedPrompt = encodeURIComponent(prompt);
    const url = `https://text.pollinations.ai/${encodedPrompt}`;
    
    // Add proper fetch configuration for browser usage
    const response = await fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'text/plain'
      },
      cache: 'no-cache'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Get the text response
    const text = await response.text();
    
    if (!text || text.trim().length === 0) {
      throw new Error('Empty response from API');
    }
    
    return text;
  } catch (error) {
    console.error('API Call - Error details:', {
      message: error.message,
      stack: error.stack,
      prompt: prompt
    });
    throw error;
  }
};

// Alternative API function for testing
export const testPollinationsAPI = async () => {
  try {
    const testPrompt = "Hello, how are you?";
    const result = await searchPollinationsText(testPrompt);
    return result;
  } catch (error) {
    throw error;
  }
};


