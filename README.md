PromptAI 🤖
An intelligent AI prompt engineering assistant built with React and Tailwind CSS.

PromptAI is a sleek, modern, and fully responsive web application designed to help developers and creators craft better prompts for AI models. Instead of just sending a raw idea to an AI, PromptAI analyzes your input for action-oriented keywords and enhances it to generate more precise and context-rich prompts, leading to superior results from AI text and image generators.

<img width="1919" height="868" alt="image" src="https://github.com/user-attachments/assets/d7d90d4d-ae09-42b9-aafe-d724cd809b80" />


✨ Key Features
🧠 Smart Prompt Enhancement: Automatically analyzes user input for keywords (generate, create, write) and prepends contextual instructions to improve AI comprehension.

🗣️ Interactive Chat Interface: A clean, WhatsApp-style chat UI to view your conversation with the AI.

🌓 Light & Dark Mode: A beautiful and persistent theme toggle that respects user preference by saving it to local storage.

📱 Fully Responsive Design: A mobile-first approach ensures a seamless experience on all devices, from desktops to smartphones.

📜 Recent Chat History: The sidebar keeps track of your recent conversations, allowing you to revisit them easily.

🚀 Purely Frontend: Built entirely with React, making it lightweight, fast, and easy to deploy on any static hosting platform.

🎬 Smooth Animations: Polished user interface with subtle animations powered by Framer Motion.

🛠️ Tech Stack
This project is built with a modern and powerful frontend stack:

Core Framework: React.js

Styling: Tailwind CSS

Animations: Framer Motion

Notifications: React Toastify

Icons: React Icons

⚙️ How It Works
The application follows a clear, component-based architecture with a centralized state management approach in the main App.js component.

User Input: The user interacts with the Home component to start a new chat or the ChatWindow for an existing one.

Keyword Validation: Before sending, the input is passed to a utility function in KeyWordDetection.js which checks for mandatory action keywords (like 'generate', 'create'). If none are found, a notification is shown.

Prompt Enhancement: If validation passes, the prompt is enhanced with a contextual prefix (e.g., "Please create or generate: ...").

State Management: The user's message is sent up to the parent App.js component. If it's a new chat, App.js creates a new chat session; otherwise, it adds the message to the existing chat's history. This immediately updates the UI.

API Call: The enhanced prompt is sent to the Pollinations AI API via the searchPollinationsText function.

Display Response: The AI's response is received, sent back up to App.js to be saved in the central state, and then displayed in the chat UI.

📁 Project Structure
The project code is organized logically to separate concerns, making it clean and maintainable.

/src
|
|-- /assets           # Images, logos, and other static files
|-- /Components       # All React components (Sidebar, Home, Card, etc.)
|-- /Context          # React Context for global state (ThemeContext.js)
|-- /config           # API connection logic (pollinationsApi.js)
|-- /utils            # Helper functions (keywordDetection.js)
|
|-- App.js            # Main application component, handles state and routing
|-- index.css         # Global styles and Tailwind imports
|-- index.js          # Entry point of the React application

🔗 API
This project utilizes the public Pollinations AI text generation endpoint. It's a powerful and free-to-use API that provides the AI responses for the chat. No API key is required for its basic usage.

🧑‍💻 Connect with Me
Feel free to connect with me on my social platforms:

GitHub: @Sunil10das-ytmx

LinkedIn: Sunil Das

Instagram: @_sunildas10

