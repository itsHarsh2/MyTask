// src/components/Search.jsx
import React, { useState, useRef, useEffect } from 'react'; // Import useEffect
import { FaMicrophone, FaSearch } from 'react-icons/fa';

// Add the initialQuery prop
const Search = ({ onSearch, initialQuery = '' }) => {
  const [query, setQuery] = useState(initialQuery); // Initialize state with prop
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // Use useEffect to update the internal state when the initialQuery prop changes
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  const handleVoiceSearch = () => {
    // ... (rest of the voice search logic is the same)
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        onSearch(transcript);
        setIsListening(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
      recognitionRef.current = recognition;
    } else {
      alert('Your browser does not support the Web Speech API.');
    }
  };

  return (
    <div className="flex items-center gap-2 relative bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-[#1E2A78]">
      <FaSearch className="text-gray-400" />
      <input
        type="text"
        placeholder="Search for tasks..."
        value={query}
        onChange={handleInputChange}
        className="flex-grow bg-transparent outline-none border-none placeholder-gray-500"
      />
      <button
        onClick={handleVoiceSearch}
        className={`p-2 rounded-full ${isListening ? 'bg-red-500 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-600'} transition-all duration-200`}
        aria-label="Voice search"
        title="Voice search"
      >
        <FaMicrophone />
      </button>
    </div>
  );
};

export default Search;