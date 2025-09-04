// App.js
import React, { createRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppProvider } from "./AppContext";

import Home from './Home';
import CreateEventTabs from './CreateEventTabs';
import Agenda from './Agenda';

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
      </Stack.Navigator>
    </NavigationContainer>
    </AppProvider>
  );
}