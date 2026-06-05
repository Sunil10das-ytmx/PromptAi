const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const searchPollinationsText = async (prompt, retryCount = 0) => {
  const maxRetries = 2;
  try {
    const apiKey = import.meta.env.VITE_POLLINATIONS_API_KEY;
    const isDev = import.meta.env.DEV;
    
    let url;
    let headers = { 'Content-Type': 'application/json' };
    let body;

    if (apiKey) {
      // Use new unified endpoint with API key
      url = 'https://gen.pollinations.ai/v1/chat/completions';
      headers['Authorization'] = `Bearer ${apiKey}`;
      body = JSON.stringify({
        model: 'openai',
        messages: [
          {
            role: 'system',
            content: 'You are PromptAI, a helpful AI prompt engineer. Help the user optimize, enhance, or create high-quality prompts based on their ideas, or respond to their queries naturally.'
          },
          {
            role: 'user',
            content: prompt
          }
        ]
      });
    } else {
      // Use legacy text API (no API key needed)
      url = isDev ? '/api-pollinations/' : 'https://text.pollinations.ai/';
      if (!isDev) {
        console.warn('PromptAI: Direct calls to text.pollinations.ai in production might be blocked by Cloudflare Turnstile. Please set VITE_POLLINATIONS_API_KEY environment variable to use the gen.pollinations.ai endpoint.');
      }
      body = JSON.stringify({
        messages: [
          {
            role: 'system',
            content: 'You are PromptAI, a helpful AI prompt engineer. Help the user optimize, enhance, or create high-quality prompts based on their ideas, or respond to their queries naturally.'
          },
          {
            role: 'user',
            content: prompt
          }
        ]
      });
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body
    });
    
    if (response.status === 429 && retryCount < maxRetries) {
      const backoffDelay = Math.pow(2, retryCount) * 1000;
      console.warn(`API Rate Limited (429). Retrying in ${backoffDelay}ms...`);
      await wait(backoffDelay);
      return searchPollinationsText(prompt, retryCount + 1);
    }
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    let text;
    if (apiKey) {
      const data = await response.json();
      text = data.choices?.[0]?.message?.content;
    } else {
      text = await response.text();
    }
    
    if (!text || text.trim().length === 0) {
      throw new Error('Empty response from API');
    }
    
    return text;
  } catch (error) {
    if (error.message.includes('429') && retryCount < maxRetries) {
      const backoffDelay = Math.pow(2, retryCount) * 1000;
      console.warn(`API Rate Limited (429) via error. Retrying in ${backoffDelay}ms...`);
      await wait(backoffDelay);
      return searchPollinationsText(prompt, retryCount + 1);
    }
    
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
