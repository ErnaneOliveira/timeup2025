// AppContext.js
import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [event, setEvent] = useState({
    codEvento: null,
    titulo: "",
    descricao: "",
    prioridade: 1,
    endereco: "",
    dataInicio:"",
    dataTermino:"",
    codCategoria: 0,
    link: "",
    arquivo:"",
    nomeContato:"",
    numeroContato:"",
    email:""
  });

  // Helper: update one field only
  const updateEventField = (field, value) => {
    setEvent(prev => ({
      ...prev,
      [field]: value,
    }));
  };


  return (
    <AppContext.Provider value={{ event, setEvent, updateEventField }}>
      {children}
    </AppContext.Provider>
  );
};