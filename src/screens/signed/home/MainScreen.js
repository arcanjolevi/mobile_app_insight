import * as React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import logo from '../../../../assets/w.png';
import HomeScreen from './HomeScreen';

const HomeStack = createStackNavigator();

export default function MainScreen (){
    return (
        <HomeStack.Navigator
            headerMode="screen" 
            screenOptions={{
            
                headerStatusBarHeight: 10,            
                headerRight: () => {
                    return <Image source={logo} style={ { marginBottom: 10, marginRight: 10 } } />
                },
                headerTitleStyle: {
                    color: "#040404"
                }
            }}
        
        >
            <HomeStack.Screen name='Home' component={ HomeScreen } />        
        </HomeStack.Navigator>
    );
};

const screenOptions = {
    headerShown: false
};