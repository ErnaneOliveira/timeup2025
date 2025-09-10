// AppContext.js
import React, { createContext, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [event, setEvent] = useState({
    codCalendar: null,
    codEvento: null,
    titulo: "Gravação de videoaula",
    descricao: "Nova gravação",
    prioridade: 1,
    endereco: "UFMG",
    dataInicio:"2025-09-10T10:05:00",
    dataTermino:"2025-09-10T11:05:00",
    codCategoria: 3,
    link: "google.com",
    arquivo:"meuarquivo.zip",
    nomeContato:"Ernane Oliveira",
    numeroContato:"5531991469124",
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