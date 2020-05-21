import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import Ion from 'react-native-vector-icons/Ionicons';

//Screens comonents
import TeamAdmin from './teamAdmin/MainScreen';
import Messages from './message/MainScreen';
import Espiritual from './espiritual/MainScreen';

//Context provider for admin
import { AdminProvider } from '../../../contexts/Admin';

//Navigators
const AdminTab = createBottomTabNavigator();
const AdminStack = createStackNavigator();

//screens names
const nameTeamsScreen = "Equipes";
const nameMensagesScreen = "Noticías";
const nameEspiritualScreen = "Espiritual";

function MainScreen () {
	return(
		<AdminProvider>
			<AdminTab.Navigator headerMode="screen"  screenOptions={screenOptions} tabBarOptions={tabBarOptions}>
    		<AdminTab.Screen name={nameTeamsScreen} component={TeamAdmin} />
    		<AdminTab.Screen name={nameMensagesScreen} component={Messages} />
				<AdminTab.Screen name={nameEspiritualScreen} component={Espiritual} />
			</AdminTab.Navigator>
		</AdminProvider>
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
			}else if(route.name == nameEspiritualScreen){
				iconName = "ios-flame";
			}else{
    	  iconName = "md-paper";
    	}

    	return <Ion name={iconName} color={iconColor} size={30}></Ion>
	},
});

const tabBarOptions={
	activeTintColor: '#000',
	inactiveTintColor: '#CCC',
};

