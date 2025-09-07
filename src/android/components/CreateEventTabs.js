import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EventTab1 from './CreateEventTab1';
import EventTab2 from './CreateEventTab2';
import EventTab3 from './CreateEventTab3';


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
        <Tab.Screen name="Básico" component={EventTab1} />
        <Tab.Screen name="Extras" component={EventTab2} />
      </Tab.Navigator>
  );
}
