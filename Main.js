import * as React from 'react';
import {
  Text,
  Button,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  ImageBackground,
} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { createDrawerNavigator, DrawerItems } from '@react-navigation/drawer';

//let { StyleSheet } = React;

import TimerScreen from './pages/HomeAndTimer.js';
import GamesScreen from './pages/Games.js';
import RewardsScreen from './pages/Rewards.js';
import ShopScreen from './pages/Shop';

import SnakeGame from './pages/SnakeGame';
import TicTacToe from './pages/TicTacToe';
import SignUpPage from './pages/SignUpPage';
import ButtonSign from './pages/ButtonSignUp';

const Stack = createNativeStackNavigator();
/*
function TimerScreen(props){
    return (
    <View style={{ flex: 1, alignItems: 'center' }}>
         Hiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    </View>
  );
}
*/

// const RootStack = createDrawerNavigator(
/*{
        'Home':Home,
        'Log-in':Login,
        'About Us':About,
        'How to use app':Usage,
        'Logout':Logout

    }
) */





function TimerStack() {
  return (
    <Stack.Navigator initialRouteName="Timer">
      <Stack.Screen name="Productivity Timer ⏱️" component={TimerScreen} />
      <Stack.Screen name="Games1" component={GamesScreen} />
      <Stack.Screen name="Shop2" component={ShopScreen} />
      <Stack.Screen name="Rewards3" component={RewardsScreen} />
    </Stack.Navigator>
  );
}

function GamesStack() {
  return (
    <Stack.Navigator initialRouteName="Games">
      <Stack.Screen name="Games 🎮" component={GamesScreen} />
      <Stack.Screen name="Productivity Timer3" component={TimerScreen} />
      <Stack.Screen name="Shop4" component={ShopScreen} />
      <Stack.Screen name="Rewards2" component={RewardsScreen} />
      <Stack.Screen name="SnakeGame" component={SnakeGame} />
      <Stack.Screen name="TicTacToe" component={TicTacToe} />
    </Stack.Navigator>
  );
}

function ShopStack() {
  return (
    <Stack.Navigator initialRouteName="Shop">
      <Stack.Screen name="Shop 🛍️" component={ShopScreen} />
      <Stack.Screen name="Productivity Timer1" component={TimerScreen} />
      <Stack.Screen name="Games2" component={GamesScreen} />
      <Stack.Screen name="Rewards3" component={RewardsScreen} />
    </Stack.Navigator>
  );
}
function RewardsStack() {
  return (
    <Stack.Navigator initialRouteName="Rewards">
      <Stack.Screen name="Rewards 🏆" component={RewardsScreen} />
      <Stack.Screen name="Productivity Timer2" component={TimerScreen} />
      <Stack.Screen name="Games3" component={GamesScreen} />
      <Stack.Screen name="Shop4" component={ShopScreen} />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
//const Drawer = createDrawerNavigator();


function MainScreen(props) {
  return (
    
      
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Timer') {
              return (
                <Image
                  source={
                    focused
                      ? require('./assets/timer_focused.png')
                      : require('./assets/timer.png')
                  }
                  style={{
                    height: 30,
                    width: 34,
                  }}
                />
              );
            } else if (route.name === 'Games') {
              return (
                <Image
                  source={
                    focused
                      ? require('./assets/controller_focused.png')
                      : require('./assets/controller.png')
                  }
                  style={{
                    height: 35,
                    width: 50,
                    marginTop: 10,
                  }}
                />
              );
            } else if (route.name === 'Shop') {
              return (
                <Image
                  source={
                    focused
                      ? require('./assets/cart_focused.png')
                      : require('./assets/cart.png')
                  }
                  style={{
                    height: 36,
                    width: 36,
                    marginTop: 2,
                  }}
                />
              );
            } else if (route.name === 'Rewards') {
              return (
                <Image
                  source={
                    focused
                      ? require('./assets/rewards_focused.png')
                      : require('./assets/rewards.png')
                  }
                  style={{
                    height: 35,
                    width: 35,
                    marginTop: 5,
                  }}
                />
              );
            }
            // You can return any component that you like here!
            return <Text>{route.name}</Text>;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}>
        
        
        <Tab.Screen name="Timer" component={TimerStack} />
        <Tab.Screen name="Games" component={GamesStack} />
        <Tab.Screen name="Shop" component={ShopStack} />
        <Tab.Screen name="Rewards" component={RewardsStack} />
      </Tab.Navigator>
    


  )};

  export default MainScreen; 
        
