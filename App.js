/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer,useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider,} from 'native-base';

import HomeScreen from './screens/HomeScreen';
import AddToDoListScreen from './screens/AddToDoListScreen';
import CompletedToDoListScreen from './screens/CompletedToDoListScreen';
import MenuComponent from './screens/Menu';
const Stack = createNativeStackNavigator();
function App() {
  
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} 
            options={{
              headerTitle: "To Do List" ,
              headerRight: () => (
                <MenuComponent
                />
              ),
            }}
        />
          <Stack.Screen name="Add To Do" component={AddToDoListScreen} />
          <Stack.Screen name="Completed To Do" component={CompletedToDoListScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}



export default App;
