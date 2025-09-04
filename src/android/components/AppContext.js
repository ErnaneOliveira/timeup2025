// AppContext.js
import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [event, setEvent] = useState({
    codEvento: null,
    titulo: "Insert title",
    descricao: "insert description",
    prioridade: 0,
    endereco: "UFMG",
    dataInicio:"2025-09-11T20:00:00",
    dataTermino:"2025-09-11T21:00:00",
    codCategoria: 0,
    link: "google.com",
    arquivo:"meuarquivo.pdf",
    nomeContato:"Ernane",
    numeroContato:"+5531991469124",
    email:"radarufmg@gmail.com"
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