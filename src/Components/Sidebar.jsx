import React, { useState } from "react";
import { FaHome, FaInfoCircle, FaBars, FaPlus, FaCommentDots, FaGithub, FaLinkedin, FaInstagram, FaMoon, FaSun } from "react-icons/fa";
import PromptAiImg from "../assets/PromptAi.png";
import { useTheme } from "../Context/ThemeContext";

const Sidebar = ({ onToggle, onNavigate, onNewChat, chatHistory, currentChatId, mobileMenuOpen, setMobileMenuOpen }) => {
  const [extended, setExtended] = useState(false);
  const { isDark, toggleTheme, colors } = useTheme();

  const items = [
    { icon: <FaHome className="text-purple-400" />, label: "Home", action: () => onNavigate('home') },
    { icon: <FaInfoCircle className="text-purple-400" />, label: "About My Project", action: () => onNavigate('about') },
  ];

  const toggleSidebar = () => {
    setExtended((prev) => !prev);
    if (onToggle) onToggle(!extended);
  };

  const handleMenuItemClick = (action) => {
    action();
    // Close mobile menu when item is clicked
    if (setMobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full transition-all duration-300 ease-in-out z-50 flex flex-col
                 w-[250px] ${extended ? "md:w-[250px]" : "md:w-[70px]"} 
                 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      style={{ backgroundColor: colors.sidebar, color: colors.text }}
    >
      {/* Top: logo + toggle */}
      <div className="flex items-center justify-between p-4">
        {(extended || mobileMenuOpen) && (
          <img
            className="object-contain h-14 w-14"
            src={PromptAiImg}
            alt="PromptAi Logo"
          />
        )}

        {/* Desktop toggle button */}
        <button
          onClick={toggleSidebar}
          className="text-purple-800 p-2 rounded hover:bg-gradient-to-r from-purple-500 to-orange-400 transition hidden md:block"
        >
          <FaBars size={18} />
        </button>

        {/* Mobile close button */}
        {mobileMenuOpen && (
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden text-purple-800 p-2 rounded hover:bg-gradient-to-r from-purple-500 to-orange-400 transition"
          >
            <FaBars size={18} />
          </button>
        )}
      </div>

      {/* Menu */}
      <nav className="mt-4 flex flex-col gap-4 flex-1">
        {items.map((it, idx) => (
          <div
            key={idx}
            onClick={() => handleMenuItemClick(it.action)}
            className="flex items-center gap-3 px-4 py-2 cursor-pointer rounded-md
                       hover:bg-gradient-to-r from-purple-600 to-orange-400 transition"
            title={it.label}
          >
            {it.icon}
            {(extended || mobileMenuOpen) && <span>{it.label}</span>}
          </div>
        ))}

        {/* New Chat Button */}
        <div
          onClick={() => handleMenuItemClick(onNewChat)}
          className="flex items-center gap-3 px-4 py-2 mt-6 cursor-pointer rounded-md 
                      hover:bg-gradient-to-r from-purple-600 to-orange-400 transition"
        >
          <FaPlus className="text-purple-400" />
          {(extended || mobileMenuOpen) && <span>New Chat</span>}
        </div>

        {/* Recent Section */}
        {(extended || mobileMenuOpen) && chatHistory && chatHistory.length > 0 && (
          <div className="mt-6 px-4">
            <p className="text-sm mb-2" style={{ color: colors.textMuted }}>Recent</p>
            {chatHistory.slice(-5).map((chat) => (
              <div
                key={chat.id}
                onClick={() => handleMenuItemClick(() => onNavigate('chat', chat.id))}
                className={`flex items-center gap-3 px-2 py-2 cursor-pointer rounded-md transition`}
                style={{
                  backgroundColor: currentChatId === chat.id ? colors.hover : 'transparent',
                  ':hover': { backgroundColor: colors.hover }
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = colors.hover}
                onMouseLeave={(e) => e.target.style.backgroundColor = currentChatId === chat.id ? colors.hover : 'transparent'}
              >
                <FaCommentDots className="text-purple-400" />
                <span className="truncate text-sm" style={{ color: colors.text }}>
                  {chat.title || `Chat ${chat.id.toString().slice(-4)}`}
                </span>
              </div>
            ))}
          </div>
        )}
      </nav>

      {/* Theme Toggle */}
      <div className="p-4" style={{ borderTop: `1px solid ${colors.border}` }}>
        {extended ? (
          <div
            onClick={toggleTheme}
            className="flex items-center gap-3 px-2 py-2 cursor-pointer rounded-md transition"
            style={{ ':hover': { backgroundColor: colors.hover } }}
            onMouseEnter={(e) => e.target.style.backgroundColor = colors.hover}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            {isDark ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-purple-400" />}
            <span className="text-sm">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
          </div>
        ) : (
          <div
            onClick={toggleTheme}
            className="flex justify-center p-2 rounded-md cursor-pointer transition"
            style={{ ':hover': { backgroundColor: colors.hover } }}
            onMouseEnter={(e) => e.target.style.backgroundColor = colors.hover}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDark ? <FaSun className="text-yellow-400" size={18} /> : <FaMoon className="text-purple-400" size={18} />}
          </div>
        )}
      </div>

      {/* Social Media Links at Bottom */}
      <div className="p-4" style={{ borderTop: `1px solid ${colors.border}` }}>
        {extended ? (
          <div className="space-y-3">
            <p className="text-xs mb-3" style={{ color: colors.textMuted }}>Connect with me</p>
            <a
              href="https://github.com/Sunil10das-ytmx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-2 py-2 cursor-pointer rounded-md transition"
              style={{ ':hover': { backgroundColor: colors.hover } }}
              onMouseEnter={(e) => e.target.style.backgroundColor = colors.hover}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <FaGithub className="text-gray-300" />
              <span className="text-sm">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/sunil-das-494114299"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-2 py-2 cursor-pointer rounded-md transition"
              style={{ ':hover': { backgroundColor: colors.hover } }}
              onMouseEnter={(e) => e.target.style.backgroundColor = colors.hover}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <FaLinkedin className="text-blue-400" />
              <span className="text-sm">LinkedIn</span>
            </a>
            <a
              href="https://www.instagram.com/_sunildas10?igsh=Zjh1OGIydm1heGMx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-2 py-2 cursor-pointer rounded-md transition"
              style={{ ':hover': { backgroundColor: colors.hover } }}
              onMouseEnter={(e) => e.target.style.backgroundColor = colors.hover}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <FaInstagram className="text-pink-400" />
              <span className="text-sm">Instagram</span>
            </a>
          </div>
        ) : (
          <div className="flex flex-col gap-3 items-center">
            <a
              href="https://github.com/Sunil10das-ytmx"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md transition"
              style={{ ':hover': { backgroundColor: colors.hover } }}
              onMouseEnter={(e) => e.target.style.backgroundColor = colors.hover}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              title="GitHub"
            >
              <FaGithub className="text-gray-300" size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/sunil-das-494114299"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md transition"
              style={{ ':hover': { backgroundColor: colors.hover } }}
              onMouseEnter={(e) => e.target.style.backgroundColor = colors.hover}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              title="LinkedIn"
            >
              <FaLinkedin className="text-blue-400" size={18} />
            </a>
            <a
              href="https://www.instagram.com/_sunildas10?igsh=Zjh1OGIydm1heGMx"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-md transition"
              style={{ ':hover': { backgroundColor: colors.hover } }}
              onMouseEnter={(e) => e.target.style.backgroundColor = colors.hover}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              title="Instagram"
            >
              <FaInstagram className="text-pink-400" size={18} />
            </a>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar