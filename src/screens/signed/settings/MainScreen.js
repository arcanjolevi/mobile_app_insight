import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SettingsScreen from './SettingsScreen';
import MyProfileScreen from './MyProfileScreen';
import { Image } from 'react-native';

import TeamScreen from './TeamScreen';
import InfoScreen from './InfoScreen';
import logo from '../../../../assets/w.png';

const SettingsStack = createStackNavigator();

export default function MainScreen (){
    return (
        <SettingsStack.Navigator
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
            <SettingsStack.Screen name='Configurações' component={ SettingsScreen }  />
            <SettingsStack.Screen name='Profile' component={ MyProfileScreen }  />
            <SettingsStack.Screen name='Info' component={ InfoScreen }  />
            <SettingsStack.Screen name='Team' component={ TeamScreen }  />
        </SettingsStack.Navigator>
    );
};

const screenOptions = {
    headerShown: false
};