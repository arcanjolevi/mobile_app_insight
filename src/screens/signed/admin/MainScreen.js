import * as React from 'react';
import { Image, View, TouchableOpacity, Text, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import Ion from 'react-native-vector-icons/Ionicons';
import logo from '../../../../assets/w.png';
import TeamsConfigScreen from './teamAdmin/TeamsAdminScreen';

import TeamAdmin from './teamAdmin/MainScreen';
import Messages from './message/MainScreen';
import News from './news/MainScreen';

const AdminTab = createBottomTabNavigator();

const nameTeamsScreen = "Equipes";
const nameNewsScreen = "Noticias";
const nameInstituitionsScre = "Instituições";
const nameMensagesScreen = "Menssgens";

const AdminStack = createStackNavigator();

function MainScreen () {
	return(
		<AdminTab.Navigator headerMode="screen"  screenOptions={screenOptions} tabBarOptions={tabBarOptions}>
    		<AdminTab.Screen name={nameTeamsScreen} component={TeamAdmin} />
    		<AdminTab.Screen name={nameMensagesScreen} component={Messages} />
				<AdminTab.Screen name={nameNewsScreen} component={News} />
    	</AdminTab.Navigator>
	);
}



export default function AdminScreen ({ navigation }){

  	return (		
		<AdminStack.Navigator >
			<AdminStack.Screen name="Admin" component={MainScreen} options={{ headerShown: false }}/>
		</AdminStack.Navigator>
  	);	
}


const screenOptions = ({ route }) => ({
	tabBarIcon: ({ focused, color, size }) => {
		let iconColor = focused ? "#000" : "#CCC"; 
    	let iconName;
	
    	if(route.name == nameTeamsScreen){
    	  iconName = "md-people";
			}else if(route.name == nameNewsScreen){
				iconName = 'md-paper';
			}else{
    	  iconName = "md-quote";
    	}

    	return <Ion name={iconName} color={iconColor} size={30}></Ion>
	},
});

const tabBarOptions={
	activeTintColor: '#000',
	inactiveTintColor: '#CCC',
};

