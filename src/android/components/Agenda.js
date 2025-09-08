import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Todas from './Todas';
import Gravacoes from './Gravacoes';
import Provas from './Provas';
import Microfundamentos from './Microfundamentos';
import { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';


const Tab = createMaterialTopTabNavigator();

export default function CreateEventTabs() {

  const [responseData, setResponseData]=useState([]);

  useEffect(() => {
  
      const handlePostRequest = async () => {
  
        const response = await fetch("http://atendimento.caed.ufmg.br:8000/timeup2025/getevents.php?codCategoria=%");
        const text = await response.text();
        //console.log("Raw response:", text);
  
        // Try parse JSON if possible
        try {
          const data = JSON.parse(text);
          setResponseData(data);
          console.log(data);
        } catch {
          console.warn("Response is not valid JSON");
        }
      };
      handlePostRequest();
      
    }, []);

  return (
      responseData ? (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarLabelStyle: { fontSize: 14 },
          tabBarStyle: { backgroundColor: '#347ad2' },
        }}
      >
        <Tab.Screen name="Todas" component={Todas} initialParams={{ data: responseData, codCategory: 3}} />
        <Tab.Screen name="Gravações" component={Gravacoes} initialParams={{ data: responseData, codCategory: 3}} />
        <Tab.Screen name="Provas" component={Provas} initialParams={{ data: responseData, codCategory: 2}}/>
        <Tab.Screen name="MF" component={Microfundamentos} initialParams={{ data: responseData, codCategory: 3}}/>
      </Tab.Navigator>
      ) : (
    <ActivityIndicator />
  )
  );
}
