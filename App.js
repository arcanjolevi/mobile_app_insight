import React from 'react';
import { StatusBar } from 'react-native';
import WelcomeScreen from './src/screens/WelcomeScreen';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './src/contexts/Auth';

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      <NavigationContainer>
        <AuthProvider>
          <WelcomeScreen />
        </AuthProvider>        
      </NavigationContainer>          
    </>
  );
}