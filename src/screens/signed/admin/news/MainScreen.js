import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';


import NewsScreen from './NewsScreen';

import logo from '../../../../../assets/w.png';

const NewsStack = createStackNavigator();

export default function MainScreen (){  
  return (    
  	  <NewsStack.Navigator
      headerMode="screen" 
      screenOptions={{
        headerStatusBarHeight: 10,            
        headerRight: () => {
          return <Image source={logo} style={ { marginBottom: 10, marginRight: 10 } } />
        },
        headerTitleStyle: {
          marginLeft: 0,
          color: "#040404"
        },
        headerBackTitleStyle:{
          color:'tomato'
        }
      }}
      >      
        <NewsStack.Screen name='Noticias' component={ NewsScreen } />
        
      </NewsStack.Navigator>   
    );
};
const screenOptions = {
    headerShown: false
};