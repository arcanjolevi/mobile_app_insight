import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Image, ActivityIndicator } from 'react-native';

import logo from '../../../../assets/w.png';

import TeamsScreen from './TeamScreen/TeamScreen';
import TeamDetailsScreen from './TeamDetails/TeamDetailsScreen';
import PersonalDetailsScreen from './PersonalDetails/PersonalDetailsScreen';
import ContactScreen from './ContactScreen/ContactScreen';

const TeamStack = createStackNavigator();

export default function MainScreen (){  
  return (
  	  <TeamStack.Navigator
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
      	<TeamStack.Screen name='Equipes' component={ TeamsScreen } />
        <TeamStack.Screen name='Detalhes' component={ TeamDetailsScreen } />
        <TeamStack.Screen name='Integrante' component={ PersonalDetailsScreen } />
        <TeamStack.Screen name='Contato' component={ ContactScreen } />
      </TeamStack.Navigator>
    );
};

const screenOptions = {
    headerShown: false
};