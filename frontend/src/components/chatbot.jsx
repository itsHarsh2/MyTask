import React, { useState, useEffect } from 'react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Replace these with your actual Botpress configuration
  const botpressConfig = {
    botId: 'your-bot-id', // Get this from your Botpress dashboard
    hostUrl: 'https://cdn.botpress.cloud/webchat/v0',
    messagingUrl: 'https://messaging.botpress.cloud',
    clientId: '49c88a77-abfd-4555-823e-ceee82ac358f', // Get this from your Botpress dashboard
  };

  useEffect(() => {
    // Load Botpress webchat script
    const script = document.createElement('script');
    script.src = 'https://cdn.botpress.cloud/webchat/v0/inject.js';
    script.async = true;
    
    script.onload = () => {
      // Initialize Botpress webchat
      if (window.botpressWebChat) {
        window.botpressWebChat.init({
          botId: botpressConfig.botId,
          hostUrl: botpressConfig.hostUrl,
          messagingUrl: botpressConfig.messagingUrl,
          clientId: botpressConfig.clientId,
          hideWidget: true, // Hide default widget since we're creating custom trigger
          theme: 'prism',
          themeColor: '#3b82f6', // Tailwind blue-500
          // Additional styling options
          stylesheet: 'https://webchat-styler-css.botpress.app/prod/code/custom-theme.css',
        });
        setIsLoaded(true);
      }
    };

    document.head.appendChild(script);

    // Cleanup function
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const toggleChat = () => {
    if (isLoaded && window.botpressWebChat) {
      if (isOpen) {
        window.botpressWebChat.hideChat();
      } else {
        window.botpressWebChat.showChat();
      }
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat Toggle Button */}
      {/* <button
        onClick={toggleChat}
        className={`
          relative w-14 h-14 rounded-full shadow-lg transition-all duration-300 ease-in-out
          flex items-center justify-center text-white
          hover:scale-110 hover:shadow-xl
          ${isOpen 
            ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' 
            : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
          }
        `}
        aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}
      >
        {isOpen ? (
          // Close icon (X)
          <svg 
            className="w-6 h-6 transition-transform duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          // Chat icon
          <svg 
            className="w-6 h-6 transition-transform duration-200" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
            />
          </svg>
        )}
      </button> */}

      {/* Optional: Notification badge when chat is closed */}
      {/* {!isOpen && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
          <span className="text-xs">💬</span>
        </div>
      )} */}

      {/* Optional: Welcome message tooltip */}
      {/* {!isOpen && (
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Need help? Chat with us!
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
        </div>
      )} */}
    </div>
  );
};

export default ChatBot;