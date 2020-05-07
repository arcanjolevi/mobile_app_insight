import * as React from 'react';
import { useContext } from 'react';
import UnsignedScreen from './unsigned/MainScreen';
import SignedScreen from './signed/MainScreen';
import LoadingScreen from './LoadingScreen';

import AuthContext from '../contexts/Auth';

export default function WelcomeScreen () {

	const { signed, loading } = useContext(AuthContext);

	if(loading)
		return (<LoadingScreen />);

	return signed? <SignedScreen /> : <UnsignedScreen />;

}