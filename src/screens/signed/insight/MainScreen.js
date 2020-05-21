import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';
import logo from '../../../../assets/w.png';
import MyPrayersScreen from './MyPraysScreen';
import AllPrayersScreen from './AllPraysScreen';

const PrayersStack = createStackNavigator();

import { PraysProvider } from '../../../contexts/Prays';

export default function MainScreen (){
  return (
		<PraysProvider>
			<PrayersStack.Navigator
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
        <PrayersStack.Screen name='Para Líderes' component={ MyPrayersScreen }  />        
        <PrayersStack.Screen name='Planos' component={ AllPrayersScreen } />        
      </PrayersStack.Navigator>
		</PraysProvider>
  );
};

const screenOptions = {
    headerShown: false
};