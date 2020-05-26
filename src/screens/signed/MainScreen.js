import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { Image, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import Ion from 'react-native-vector-icons/Ionicons';

import plansStack from './plans/MainScreen';
import homeStack from './home/MainScreen';
import prayersStack from './insight/MainScreen';
import settingStack from './settings/MainScreen';
import AdminScreen from './admin/MainScreen';
import TeamScreen from './team/MainScreen';

import AuthContext from '../../contexts/Auth';

import logo from '../../../assets/w.png'

const SignedTab = createBottomTabNavigator();

const nameHomeScreen = "Home";
const namePlansScreen = "Planos";
const namePrayersScreen = "Insight";
const nameSettingsScreen = "Configurações";
const nameTeamScreen = "Equipes";

const SignedStack = createStackNavigator();


function teamEnable(){

	const { team, admin } = useContext(AuthContext);
	
	if(team || admin)
		return <SignedTab.Screen name={namePrayersScreen} component={prayersStack} />;
		
}	


function SignedScreen () {
	const { updateUserData, flagUpdatedUser } = useContext(AuthContext);

		if(!flagUpdatedUser)
			updateUserData();

	return(
		<SignedTab.Navigator screenOptions={screenOptions} tabBarOptions={tabBarOptions}>
    		<SignedTab.Screen name={nameHomeScreen} component={homeStack} />
    		<SignedTab.Screen name={namePlansScreen} component={plansStack} />
				{teamEnable()}
    		<SignedTab.Screen name={nameTeamScreen} component={TeamScreen} />
				<SignedTab.Screen name={nameSettingsScreen} component={settingStack} />
    	</SignedTab.Navigator>
	);
}


export default function MainScreen ({ navigation }){
  	return (		
		<SignedStack.Navigator initialRouteName='Signed' >
			<SignedStack.Screen name="Signed" component={SignedScreen} options={{ headerShown: false }}/>
			<SignedStack.Screen name="Admin" component={AdminScreen} options={{ headerShown: false }}/>
		</SignedStack.Navigator>
  	);	
}


const screenOptions = ({ route }) => ({
	
	tabBarIcon: ({ focused, color, size }) => {
		let iconColor = focused ? "#000" : "#CCC"; 
    	let iconName;
	
    	if(route.name == nameHomeScreen){
    	  iconName = "md-home";
    	}else if( route.name == namePlansScreen ){
    	  iconName = "md-book";
    	}else if( route.name == namePrayersScreen ){
    	  iconName = "ios-bulb";
    	}else if(route.name == nameTeamScreen){
				iconName = 'ios-people';
			}else {
    	  iconName = "md-options";
    	}

    	return <Ion name={iconName} color={iconColor} size={30}></Ion>
	},
});

const tabBarOptions={
	activeTintColor: '#000',
	inactiveTintColor: '#CCC',
	
	
};

