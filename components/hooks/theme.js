"use client";

import React, { createContext, useState, useContext } from "react";

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [prevVideoId, setPrevVideoId] = useState("");

  const savePreviousVideoId = (id) => {
    setPrevVideoId(id);
  };
  
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    console.log("toggle dark mode ", isDarkMode);
  };

  return (
    <DarkModeContext.Provider
      value={{ isDarkMode, savePreviousVideoId, prevVideoId, toggleDarkMode }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => useContext(DarkModeContext);
