import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Image, ActivityIndicator } from 'react-native';
import AllPlansScreen from './AllPlansScreen';
import MyPlansScreen from './MyPlansScreen';
import PlanDetailsScreen from './PlanDetailsScreen';
import logo from '../../../../assets/w.png';

import { PlansProvider } from '../../../contexts/Plans';

const PlansStack = createStackNavigator();

export default function MainScreen (){

  
  return (
    <PlansProvider>
  	  <PlansStack.Navigator
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
      
        	<PlansStack.Screen name='Devocionais' component={ MyPlansScreen } />
          <PlansStack.Screen name='Planos' component={ AllPlansScreen }  />
          <PlansStack.Screen name='Detalhes' component={ PlanDetailsScreen } />
      </PlansStack.Navigator>
    </PlansProvider>
    );
};

const screenOptions = {
    headerShown: false
};