// ✅ FIXED: Uses Anthropic API — no CORS issues
export const searchPollinationsText = async (prompt) => {
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // No API key needed inside Claude artifacts — handled automatically
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const text = data.content?.map((b) => b.text || "").join("") || "";

    if (!text.trim()) throw new Error("Empty response from API");
    return text;

  } catch (error) {
    console.error("API Call - Error details:", {
      message: error.message,
      stack: error.stack,
      prompt,
    });
    throw error;
  }
};

export const testPollinationsAPI = async () => {
  return await searchPollinationsText("Hello, how are you?");
};