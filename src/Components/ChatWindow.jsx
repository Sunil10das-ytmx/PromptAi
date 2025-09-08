import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from 'react-toastify';
import SendIcon from "../assets/send_icon.png";
import { searchPollinationsText } from "../Config/PollinationsApi";
import { detectTriggerKeywords, enhancePrompt } from "../utils/keywordDetection";

const ChatWindow = ({ chatId, onNewMessage, messages = [] }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSend = async () => {
    if (!query.trim() || loading) return;

    // Detect keywords in the user's query
    const detection = detectTriggerKeywords(query);
    
    // Only proceed if trigger keywords are detected
    if (!detection.triggered) {
      toast.error("Please use action words like 'Generate', 'Create', 'Prompt' or 'Make' in your request!", {
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

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString()
    };

    // Add user message immediately
    onNewMessage(chatId, userMessage);
    
    const currentQuery = query;
    setQuery("");
    setLoading(true);

    try {
      // Enhance the prompt based on detected keywords
      const enhancedPrompt = enhancePrompt(currentQuery);
      
      // Get the text response from Pollinations using enhanced prompt
      const text = await searchPollinationsText(enhancedPrompt);
      
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: text,
        timestamp: new Date().toLocaleTimeString()
      };

      onNewMessage(chatId, aiMessage);
      
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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#313131]">
      {/* Chat Messages Area - WhatsApp Style */}
      <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] md:max-w-[70%] rounded-lg p-3 shadow-lg ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white rounded-br-sm'
                  : 'bg-slate-700 text-white rounded-bl-sm'
              }`}
            >
              <div className="whitespace-pre-wrap break-words">
                {message.content}
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

      {/* Input area */}
      <div className="p-3 md:p-4 border-t border-gray-600">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="w-full p-3 md:p-4 pr-12 md:pr-14 rounded-2xl text-white bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 border-none text-sm md:text-base"
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
    </div>
  );
};

export default ChatWindow;
