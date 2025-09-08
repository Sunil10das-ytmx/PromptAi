import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRobot } from 'react-icons/fa';
import { AiOutlineSend } from 'react-icons/ai';
import SendIcon from "../assets/send_icon.png";
import PromptAiLogo from "../assets/PromptAi.png";
import { searchPollinationsText } from "../Config/PollinationsApi";
import { detectTriggerKeywords, enhancePrompt } from "../utils/keywordDetection";
import { useTheme } from "../Context/ThemeContext";

// Function to parse text and make content within asterisks bold
const parseTextWithBold = (text) => {
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      // Remove asterisks and make bold
      const boldText = part.slice(1, -1);
      return <strong key={index}>{boldText}</strong>;
    }
    return part;
  });
};

const Home = ({ onNewChat, onNewMessage, currentChatId }) => {
  const [query, setQuery] = useState("");
  const [hideHero, setHideHero] = useState(false);
  const [loading, setLoading] = useState(false);

  const [chatStarted, setChatStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const { colors } = useTheme();

  // Reset chat state when currentChatId changes (new chat created)
  React.useEffect(() => {
    if (currentChatId) {
      // Reset to initial state for new chat but keep chatStarted if messages exist
      setMessages([]);
      setQuery("");
      setHideHero(false);
      setLoading(false);
      // Only reset chatStarted if we don't have messages
      setChatStarted(false);
    }
  }, [currentChatId]);

  // Real-time keyword detection as user types
  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim()) {
      const detection = detectTriggerKeywords(value);
      setLiveDetection(detection);
    } else {
      setLiveDetection(null);
    }
  };

  const handleSend = async () => {
    if (!query.trim()) return;

    // Detect keywords in the user's query
    const detection = detectTriggerKeywords(query);
    
    // Only proceed if trigger keywords are detected
    if (!detection.triggered) {
      toast.error("Please use action words like 'Generate', 'Create', 'Prompt' or 'Write' in your request!", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }

    const currentQuery = query;
    
    // Add user message to local state immediately for UI display
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: currentQuery,
      timestamp: new Date().toLocaleTimeString()
    };
    
    // Clear input and set all states together
    setQuery("");
    setChatStarted(true);
    setHideHero(true);
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    
    // If we have a currentChatId, also add to parent state
    if (currentChatId && onNewMessage) {
      onNewMessage(currentChatId, userMessage);
    } else if (onNewChat) {
      // No current chat, create new one
      onNewChat();
    }

    try {
      // Enhance the prompt based on detected keywords
      const enhancedPrompt = enhancePrompt(currentQuery);
      
      // Get the text response from Pollinations using enhanced prompt
      const text = await searchPollinationsText(enhancedPrompt);
      
      // Add AI response
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: text,
        timestamp: new Date().toLocaleTimeString()
      };
      
      // Add to local state for immediate display
      setMessages(prev => [...prev, aiMessage]);
      
      // Add to parent state if we have currentChatId
      if (currentChatId && onNewMessage) {
        onNewMessage(currentChatId, aiMessage);
      }
      
    } catch (err) {
      console.error("API error:", err);
      toast.error("Failed to get response. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll to bottom when new messages arrive
  React.useEffect(() => {
    if (messagesEndRef.current && chatStarted) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, chatStarted]);

  return (
    <div className="h-screen w-full flex flex-col" style={{ backgroundColor: colors.primary }}>
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Header */}
      <header className="flex justify-between items-center p-4 md:px-6" style={{ backgroundColor: colors.primary }}>
        <div className="flex items-center space-x-3">
          <h1 className="text-lg md:text-xl font-bold" style={{ color: colors.text }}>
            <span className="text-orange-300">Prompt</span>
            <span className="text-violet-600">Ai</span>
          </h1>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
          <img src={PromptAiLogo} alt="Prompt.AI" className="h-6 w-6 md:h-8 md:w-8" />
          </div>
        </div>
      </header>

      {/* Chat started layout */}
      {chatStarted ? (
        <>
          {/* Messages area */}
          <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[70%] rounded-lg p-3 shadow-lg rounded-bl-sm rounded-br-sm`}
                  style={{
                    backgroundColor: message.type === 'user' ? colors.userBubble : colors.aiBubble,
                    color: colors.text
                  }}
                >
                  <div className="whitespace-pre-wrap break-words">
                    {parseTextWithBold(message.content)}
                  </div>
                  <div
                    className={`text-xs mt-2 ${
                      message.type === 'user' ? 'text-blue-200' : 'text-gray-400'
                    } text-right`}
                  >
                    {message.timestamp}
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Loading indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-700 rounded-lg rounded-bl-sm p-3 shadow-lg max-w-[70%]">
                  <div className="text-white flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-sm">AI is typing...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Fixed input at bottom */}
          <div className="p-3 md:p-4" style={{ borderTop: `1px solid ${colors.border}` }}>
            <div className="w-full max-w-2xl mx-auto relative">
              <input
                id="query"
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Type a message..."
                className="w-full p-3 md:p-4 pr-12 md:pr-14 rounded-2xl focus:outline-none focus:ring-2 border-none text-sm md:text-base"
                style={{
                  backgroundColor: colors.input,
                  color: colors.text,
                  borderColor: colors.inputFocus
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                disabled={loading}
              />
              <img
                onClick={handleSend}
                className={`object-contain h-6 w-6 md:h-8 md:w-8 absolute right-2 md:right-3 top-1/2 -translate-y-1/2 cursor-pointer ${
                  loading ? 'opacity-50' : 'hover:scale-110'
                } transition-transform`}
                src={SendIcon}
                alt="Send"
                title="Send"
              />
            </div>
          </div>
        </>
      ) : (
        /* Initial home layout */
        <div className="flex-grow flex flex-col items-center justify-center gap-6 md:gap-8 px-4">
          {/* HERO TEXT */}
          <AnimatePresence>
            {!hideHero && (
              <motion.div
                key="hero"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h2 className="text-3xl md:text-5xl font-bold text-center">
                  <span className="text-orange-300">HELLO</span>
                  <span className="text-violet-600 ml-2 md:ml-4">DEVELOPERS</span>
                </h2>
                <p className="text-2xl md:text-4xl mt-3 text-center" style={{ color: colors.textSecondary }}>
                  How Can I help You Today?
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* INPUT BAR */}
          <div className="w-full max-w-2xl relative">
            <input
              id="query"
              type="text"
              value={query}
              onChange={handleInputChange}
              placeholder="Enter your idea..."
              className="w-full p-3 md:p-4 pr-12 md:pr-14 rounded-2xl shadow-sm focus:outline-none focus:ring-2 border-none text-sm md:text-base"
              style={{
                backgroundColor: colors.input,
                color: colors.text,
                borderColor: colors.inputFocus
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              disabled={loading}
            />
            <img
              onClick={handleSend}
              className={`object-contain h-6 w-6 md:h-8 md:w-8 absolute right-2 md:right-3 top-1/2 -translate-y-1/2 cursor-pointer ${
                loading ? 'opacity-50' : 'hover:scale-110'
              } transition-transform`}
              src={SendIcon}
              alt="Send"
              title="Send"
            />
          </div>

          {/* Quick Start Tips */}
          <div className="text-center max-w-2xl px-4">
            <p className="text-xs md:text-sm mb-4" style={{ color: colors.textSecondary }}>
              💡 Use action words like <strong>"Generate"</strong>, <strong>"Create"</strong>, <strong>"Prompt"</strong>, or <strong>"Write"</strong> to get started
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              <button 
                onClick={() => setQuery("Generate a prompt for a video where a dragon is roaming in the sky")}
                className="px-2 md:px-3 py-1 rounded-full text-xs md:text-sm transition"
                style={{
                  backgroundColor: colors.secondary,
                  color: colors.text
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = colors.hover}
                onMouseLeave={(e) => e.target.style.backgroundColor = colors.secondary}
              >
                Generate a prompt
              </button>
              <button 
                onClick={() => setQuery("Create a prompt for a image where a dog is playing with a cat")}
                className="px-2 md:px-3 py-1 rounded-full text-xs md:text-sm transition"
                style={{
                  backgroundColor: colors.secondary,
                  color: colors.text
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = colors.hover}
                onMouseLeave={(e) => e.target.style.backgroundColor = colors.secondary}
              >
                Create a prompt
              </button>
              <button 
                onClick={() => setQuery("Write a prompt for a image where a cat is playing with a mouse")}
                className="px-2 md:px-3 py-1 rounded-full text-xs md:text-sm transition"
                style={{
                  backgroundColor: colors.secondary,
                  color: colors.text
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = colors.hover}
                onMouseLeave={(e) => e.target.style.backgroundColor = colors.secondary}
              >
                Write a prompt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
