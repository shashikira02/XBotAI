import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

const useChatHistory = () => {
  const [chatHistory, setChatHistory] = useLocalStorage('chat', []);
  
  const saveChatHistory = useCallback((chat) => {
    const newHistory = [{ chat, datetime: new Date() }, ...chatHistory];
    setChatHistory(newHistory);
  }, [chatHistory, setChatHistory]);

  const clearChatHistory = useCallback(() => {
    setChatHistory([]);
  }, [setChatHistory]);

  return { 
    chatHistory, 
    saveChatHistory, 
    clearChatHistory,
    setChatHistory 
  };
};

export default useChatHistory;
