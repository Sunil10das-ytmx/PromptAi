import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaBars } from 'react-icons/fa';
import Sidebar from './Components/Sidebar';
import Home from './Components/Home';
import About from './Components/About';
import ChatWindow from './Components/ChatWindow';
import { ThemeProvider, useTheme } from './Context/ThemeContext';

const AppContent = () => {
  const [currentView, setCurrentView] = useState('home');
  const [currentChatId, setCurrentChatId] = useState(null);
  const [chats, setChats] = useState({});
  const [chatHistory, setChatHistory] = useState([]);
  const [sidebarExtended, setSidebarExtended] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { colors } = useTheme();

  // Initialize with sample chat history for demonstration
  // useEffect(() => {
    // This effect runs once on mount to show that history is always visible
  // }, []);

  // Generate unique chat ID
  const generateChatId = () => {
    return Date.now().toString();
  };

  // Create new chat
  const handleNewChat = () => {
    const newChatId = generateChatId();
    const newChat = {
      id: newChatId,
      title: `New Chat`,
      messages: [],
      createdAt: new Date()
    };
    
    setChats(prev => ({ ...prev, [newChatId]: newChat }));
    setChatHistory(prev => [...prev, newChat]);
    setCurrentChatId(newChatId);
    // Keep current view as 'home' to allow the Home component to handle the chat interface
  };

  // Handle navigation
  const handleNavigate = (view, chatId = null) => {
    if (view === 'chat' && chatId) {
      setCurrentChatId(chatId);
      setCurrentView('chat');
    } else {
      setCurrentView(view);
      if (view !== 'chat') {
        setCurrentChatId(null);
      }
    }
  };

  // Handle new message in chat
  const handleNewMessage = (chatId, message) => {
    setChats(prev => {
      const updatedChat = {
        ...prev[chatId],
        messages: [...(prev[chatId]?.messages || []), message]
      };
      
      // Update title based on first user message
      if (message.type === 'user' && updatedChat.messages.filter(m => m.type === 'user').length === 1) {
        updatedChat.title = message.content.slice(0, 40) + (message.content.length > 40 ? '...' : '');
        
        // Update chat history
        setChatHistory(prevHistory => 
          prevHistory.map(chat => 
            chat.id === chatId ? { ...chat, title: updatedChat.title } : chat
          )
        );
      }
      
      return { ...prev, [chatId]: updatedChat };
    });
  };

  // Handle sidebar toggle
  const handleSidebarToggle = (extended) => {
    setSidebarExtended(extended);
  };

  // Handle mobile menu toggle
  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Render current view
  const renderCurrentView = () => {
    switch (currentView) {
      case 'about':
        return <About onNavigate={handleNavigate} />;
      case 'chat':
        if (currentChatId && chats[currentChatId]) {
          return (
            <ChatWindow
              chatId={currentChatId}
              messages={chats[currentChatId].messages}
              onNewMessage={handleNewMessage}
            />
          );
        }
        return <Home onNewChat={handleNewChat} onNewMessage={handleNewMessage} currentChatId={currentChatId} />;
      case 'home':
      default:
        return <Home onNewChat={handleNewChat} onNewMessage={handleNewMessage} currentChatId={currentChatId} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#313131]">
      {/* Mobile Menu Button - Only show when sidebar is closed */}
      {!mobileMenuOpen && (
        <button
          onClick={handleMobileMenuToggle}
          className="md:hidden fixed top-4 right-4 z-[60] p-2 rounded-lg transition-colors shadow-lg"
          style={{ backgroundColor: colors.sidebar, color: colors.text }}
        >
          <FaBars size={20} />
        </button>
      )}

      <Sidebar
        onToggle={handleSidebarToggle}
        onNavigate={handleNavigate}
        onNewChat={handleNewChat}
        chatHistory={chatHistory}
        currentChatId={currentChatId}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
      
      <main 
        className={`flex-1 transition-all duration-300 ${
          sidebarExtended ? 'md:ml-[250px]' : 'md:ml-[70px]'
        }`}
      >
        {renderCurrentView()}
      </main>

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;