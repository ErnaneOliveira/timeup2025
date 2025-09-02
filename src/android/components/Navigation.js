// App.js
import React, { createRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Home';
import CreateEventTabs from './CreateEventTabs';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home"
      screenOptions={{
            animation: 'fade', // 'fade' gives a dissolve effect
        }}>
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ title: 'Início' }}
        />
        <Stack.Screen 
          name="Eventos" 
          component={CreateEventTabs} 
          options={{ title: 'Criar Evento' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}