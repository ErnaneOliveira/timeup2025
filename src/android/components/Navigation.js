// App.js
import React, { createRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProvider } from "./AppContext";

import Home from './Home';
import CreateEventTabs from './CreateEventTabs';
import Agenda from './Agenda';
import DetalhesTab from './DetalhesTab';
import Web from './WebView';
import Cards from './Cards'
import CleanCreateEvent from './CleanCreateEvent';
import EditarEventoTab from './EditarEvento';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <AppProvider>
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName="Home"
      screenOptions={{
            animation: 'fade', // 'fade' gives a dissolve effect
            headerStyle: {
            backgroundColor: "#347ad2", // header background color
          },headerTintColor: "#fff",       // back button & title color
        }}>

        <Stack.Screen 
          name="CleanEvent" 
          component={CleanCreateEvent} 
          options={{ title: 'CleanCreateEvent'} }
        />
        
        <Stack.Screen 
          name="Cards" 
          component={Cards} 
          options={{ title: 'Dispositivos conectados'} }
        />

        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ title: 'Início', headerShown: false} }
        />
        <Stack.Screen 
          name="Eventos" 
          component={CreateEventTabs} 
          options={{ title: 'Criar Evento' }}
        />

        <Stack.Screen 
          name="Agenda" 
          component={Agenda} 
          options={{ title: 'Eventos do dia' }}
        />

        <Stack.Screen 
          name="Detalhes" 
          component={DetalhesTab} 
          options={{ title: 'Detalhes do evento' }}
        />

        <Stack.Screen 
          name="Editar" 
          component={EditarEventoTab} 
          options={{ title: 'Editar evento' }}
        />

        <Stack.Screen 
          name="WebView" 
          component={Web} 
          options={{ title: 'WebView' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
    </AppProvider>
  );
}