/**
 * Detects trigger keywords in user input
 * @param {string} text - The input text to analyze
 * @returns {object} - Detection result with matched keywords and confidence
 */
export const detectTriggerKeywords = (text) => {
  // Define trigger keywords (case-insensitive)
  const triggerKeywords = [
    'generate',
    'prompt',
    'create',
    'make',
    'build',
    'write',
    'compose',
    'produce',
    'develop'
  ];

  // Convert text to lowercase for case-insensitive matching
  const lowerText = text.toLowerCase();
  
  // Find all matched keywords
  const matchedKeywords = triggerKeywords.filter(keyword => 
    lowerText.includes(keyword)
  );

  // Check if any trigger keywords are found
  const hasTriggered = matchedKeywords.length > 0;

  // Calculate confidence based on number of matches and text length
  const confidence = hasTriggered ? 
    Math.min(matchedKeywords.length / triggerKeywords.length * 100, 100) : 0;

  return {
    triggered: hasTriggered,
    matchedKeywords,
    confidence: Math.round(confidence),
    originalText: text
  };
};

/**
 * Checks if the input contains action-oriented language
 * @param {string} text - The input text to analyze
 * @returns {boolean} - True if action keywords are detected
 */
export const isActionRequest = (text) => {
  const result = detectTriggerKeywords(text);
  return result.triggered;
};

/**
 * Enhances the prompt based on detected keywords
 * @param {string} originalPrompt - The original user prompt
 * @returns {string} - Enhanced prompt for better API results
 */
export const enhancePrompt = (originalPrompt) => {
  const detection = detectTriggerKeywords(originalPrompt);
  
  if (!detection.triggered) {
    return originalPrompt;
  }

  // Add context based on detected keywords
  let enhancedPrompt = originalPrompt;
  
  if (detection.matchedKeywords.includes('generate') || 
      detection.matchedKeywords.includes('create') ||
      detection.matchedKeywords.includes('make')) {
    enhancedPrompt = `Please create or generate: ${originalPrompt}`;
  } else if (detection.matchedKeywords.includes('prompt')) {
    enhancedPrompt = `Help me with this prompt: ${originalPrompt}`;
  } else if (detection.matchedKeywords.includes('write') || 
             detection.matchedKeywords.includes('compose')) {
    enhancedPrompt = `Please write or compose: ${originalPrompt}`;
  }

  return enhancedPrompt;
};
