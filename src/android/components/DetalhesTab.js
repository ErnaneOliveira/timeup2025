import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ViewEventTab1 from './ViewEventTab1';
import ViewEventTab2 from './ViewEventTab2';

const Tab = createMaterialTopTabNavigator();

export default function DetalhesTab({route, navigation}) {

  const codEvento = route.params.codEvento;
  return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarLabelStyle: { fontSize: 14 },
          tabBarStyle: { backgroundColor: '#347ad2' },
        }}
      >
        <Tab.Screen name="Básico" component={ViewEventTab1} initialParams={{ codEvento: codEvento}}/>
        <Tab.Screen name="Extras" component={ViewEventTab2} />
      </Tab.Navigator>
  );
}