import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EventTab2 from './CreateEventTab2';
import CleanCreateEvent from './CleanCreateEvent';


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
        <Tab.Screen name="Básico" component={CleanCreateEvent} />
        <Tab.Screen name="Extras" component={EventTab2} />
      </Tab.Navigator>
  );
}
