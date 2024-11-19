import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ClientesScreen from './screens/ClientesScreen';
import VendasScreen from './screens/VendasScreen';
import ClienteForm from './components/ClienteForm';
import VendaForm from './components/VendaForm';
import VendasClienteScreen from './screens/VendasClienteScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function ClientesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Clientes" 
        component={ClientesScreen} 
        options={{ title: 'Lista de Clientes' }} 
      />
      <Stack.Screen 
        name="ClienteForm" 
        component={ClienteForm} 
        options={{ title: 'Adicionar Cliente' }} 
      />
      <Stack.Screen 
        name="VendasCliente" 
        component={VendasClienteScreen} 
        options={{ title: 'Vendas do Cliente' }} 
      />
    </Stack.Navigator>
  );
}

function VendasStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Vendas" 
        component={VendasScreen} 
        options={{ title: 'Lista de Vendas' }} 
      />
      <Stack.Screen 
        name="VendaForm" 
        component={VendaForm} 
        options={{ title: 'Adicionar Venda' }} 
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Clientes">
        <Drawer.Screen name="Clientes" component={ClientesStack} />
        <Drawer.Screen name="Vendas" component={VendasStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}