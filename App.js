import { useEffect } from 'react';
//import { useAuth } from './auth';

import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SignUpPage from './pages/SignUpPage.js';
import ButtonSignUp from './pages/ButtonSignUp.js';
import MainScreen from './Main.js';



const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer
    independent={true}>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUpPage} />
        <Stack.Screen options={{ headerShown: false }} name="Main" component={MainScreen} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });