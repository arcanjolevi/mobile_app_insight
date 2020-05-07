import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';


import MantainTeams from './MantainTeamScreen';
import TeamAdmin from './TeamsAdminScreen';
import ModifyTeam from './ModifyTeam';
import AddTeamScreen from './AddTeam';
import AddMembers from './AddMembers';

import logo from '../../../../../assets/w.png';

const TeamAdminStack = createStackNavigator();

export default function MainScreen (){  
  return (    
  	  <TeamAdminStack.Navigator
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
        <TeamAdminStack.Screen name='Equipes' component={ TeamAdmin } />
        <TeamAdminStack.Screen name='Manutencao' component={ MantainTeams }   />
        <TeamAdminStack.Screen name='Add Equipe' component={ AddTeamScreen }   />
        <TeamAdminStack.Screen name='Alterar' component={ ModifyTeam }   />
        <TeamAdminStack.Screen name='Add Integrante' component={ AddMembers }   />
      </TeamAdminStack.Navigator>   
    );
};
const screenOptions = {
    headerShown: false
};