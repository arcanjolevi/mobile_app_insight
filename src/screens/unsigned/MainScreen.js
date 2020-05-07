import * as React               from 'react';
import { Image }                from 'react-native';
import { NavigationContainer }  from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import logo                     from '../../../assets/A2.png';
import { AsyncStorage } from 'react-native';

import LoginScreen        from './LoginScreen';
import RegisterScreen     from './RegisterScreen';
import ForgotPassScreen   from './ForgotPassScreen';
import RecoveryPassScreen from './RecoveryPassScreen';


const UnsignedStack = createStackNavigator();

export default function WelcomeScreen ({ navigation }) {

	
	return (
		
    		<UnsignedStack.Navigator 
				headerMode="screen" 
        		screenOptions={{
        	    	headerLeft: null,
        	    	headerStatusBarHeight: 10,            
        	    	headerTitle: () => {
        	    	    return <Image source={logo} style={ { marginBottom: 10} } />
        	    	},
        	    	headerTitleStyle: {
        	    	    color: "#747474"
        	    	}
        		}}
      		>
        		<UnsignedStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        		<UnsignedStack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        		<UnsignedStack.Screen name="ForgotPassword" component={ForgotPassScreen} options={{ headerShown: false }} />
        		<UnsignedStack.Screen name="Recovery" component={RecoveryPassScreen} options={{ headerShown: false }} />
      		</UnsignedStack.Navigator>
		
  );
}