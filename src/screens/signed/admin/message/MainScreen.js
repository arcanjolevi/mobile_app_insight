import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image } from 'react-native';


import MessagesScreen from './MessagesScreen';
import NewMessageScreen from './NewMessage';
import SelectReceiverScreen from './SelectReceiversScreen';
import ModifyMessageScreen from './ModifyMessageScreen';

import logo from '../../../../../assets/w.png';

const MessagesStack = createStackNavigator();

export default function MainScreen (){  
  return (    
  	  <MessagesStack.Navigator
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
        <MessagesStack.Screen name='Mensagens' component={ MessagesScreen } />
        <MessagesStack.Screen name='Nova Mensagem' component={ NewMessageScreen } />
        <MessagesStack.Screen name='Enviar para' component={ SelectReceiverScreen } />
        <MessagesStack.Screen name='Editar' component={ ModifyMessageScreen } />
        
      </MessagesStack.Navigator>   
    );
};
const screenOptions = {
    headerShown: false
};