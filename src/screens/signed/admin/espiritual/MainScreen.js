import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';

import logo from '../../../../../assets/w.png';


import PlansScreen from './plans';
import NewPlans from './newPlans';

const EspiritualStack = createStackNavigator();

export default function MainScreen (){  
  return (    
  	  <EspiritualStack.Navigator
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
        <EspiritualStack.Screen name='Planos' component={ PlansScreen } />
        <EspiritualStack.Screen name='Novo Plano' component={ NewPlans } />
        
        
      </EspiritualStack.Navigator>   
    );
};
const screenOptions = {
    headerShown: false
};