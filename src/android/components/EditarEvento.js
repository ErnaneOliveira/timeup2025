import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EditarEventoTab1 from './EditarEventoTab1';
import EditarEventoTab2 from './EditarEventoTab2';

const Tab = createMaterialTopTabNavigator();

export default function EditarEventoTab({route, navigation}) {

  const codEvento = route.params.cod;
  return (
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'white',
          tabBarLabelStyle: { fontSize: 14 },
          tabBarStyle: { backgroundColor: '#347ad2' },
        }}
      >
        <Tab.Screen name="Básico" component={EditarEventoTab1} initialParams={{ codEvento: codEvento}}/>
        <Tab.Screen name="Extras" component={EditarEventoTab2} initialParams={{ codEvento: codEvento}}/>
      </Tab.Navigator>
  );
}