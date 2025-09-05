import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ViewEventTab1 from './ViewEventTab1';
import ViewEventTab2 from './ViewEventTab2';

const Tab = createMaterialTopTabNavigator();

export default function DetalhesTab({route, navigation}) {
  return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarLabelStyle: { fontSize: 14 },
          tabBarStyle: { backgroundColor: '#6200ee' },
        }}
      >
        <Tab.Screen name="Básico" component={ViewEventTab1} />
        <Tab.Screen name="Extras" component={ViewEventTab2} />
      </Tab.Navigator>
  );
}