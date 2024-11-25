
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DestinationsList } from './components/DestinationsList';
import { DestinationDetails } from './components/DestinationDetails';
import { DestinationCreation } from './components/DestinationCreation';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Destinations list" component={DestinationsList} />
      <Stack.Screen name="DestinationDetails" component={DestinationDetails} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="Destinations" 
          component={HomeStack} 
          options={{ headerShown: false }}
        />
        <Tab.Screen name="Add Destination" component={DestinationCreation} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}