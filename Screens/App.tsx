import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './HomePage';
import AddMenuItems from './AddMenuItems';
import FilterMenu from './FilterMenu';
import AboutUs from './AboutUs';
import { MenuProvider } from './MenuContext';

// Create a stack navigator for screen transitions
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // MenuProvider makes menu data accessible across all screens
    <MenuProvider>
      {/* Handles overall app navigation */}
      <NavigationContainer>
        <Stack.Navigator>
          {/* Define all available screens in the app */}
          <Stack.Screen name="Home" component={HomePage} />
          <Stack.Screen name="AddMenuItems" component={AddMenuItems} />
          <Stack.Screen name="FilterMenu" component={FilterMenu} />
          <Stack.Screen name="AboutUs" component={AboutUs} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}
