import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true); // Default to dark theme

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const theme = {
    isDark,
    toggleTheme,
    colors: {
      // Background colors
      primary: isDark ? '#313131' : '#f8f9fa',
      secondary: isDark ? '#2a2a2a' : '#e9ecef',
      sidebar: isDark ? '#0d0d0d' : '#ffffff',
      
      // Text colors
      text: isDark ? '#ffffff' : '#212529',
      textSecondary: isDark ? '#9ca3af' : '#6c757d',
      textMuted: isDark ? '#6b7280' : '#adb5bd',
      
      // UI elements
      border: isDark ? '#374151' : '#dee2e6',
      input: isDark ? '#374151' : '#ffffff',
      inputFocus: isDark ? '#4f46e5' : '#0d6efd',
      
      // Chat bubbles
      userBubble: isDark ? '#2563eb' : '#0d6efd',
      aiBubble: isDark ? '#0d0d0d' : '#f8f9fa',
      
      // Gradients and accents
      accent: isDark ? '#8b5cf6' : '#6f42c1',
      accentSecondary: isDark ? '#f97316' : '#fd7e14',
      
      // Hover states
      hover: isDark ? '#374151' : '#e9ecef',
      hoverLight: isDark ? '#4b5563' : '#f8f9fa'
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
