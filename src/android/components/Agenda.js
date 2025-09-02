import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Todas from './Todas';
import Gravacoes from './Gravacoes';
import Provas from './Provas';
import Microfundamentos from './Microfundamentos';


const Tab = createMaterialTopTabNavigator();

export default function CreateEventTabs() {
  return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarLabelStyle: { fontSize: 14 },
          tabBarStyle: { backgroundColor: '#347ad2' },
        }}
      >
        <Tab.Screen name="Todas" component={Todas} />
        <Tab.Screen name="Gravações" component={Gravacoes} />
        <Tab.Screen name="Provas" component={Provas} />
        <Tab.Screen name="MF" component={Microfundamentos} />
      </Tab.Navigator>
  );
}
