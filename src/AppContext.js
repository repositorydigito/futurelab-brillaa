import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [formData, setFormData] = useState({});
  const [chatHistory, setChatHistory] = useState([]);

  return (
    <AppContext.Provider value={{ formData, setFormData, chatHistory, setChatHistory }}>
      {children}
    </AppContext.Provider>
  );
};
