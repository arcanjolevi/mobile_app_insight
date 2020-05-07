import * as React     				from 'react';
import { View, ActivityIndicator } 	from 'react-native';
import { Image } from 'react-native';
import logoLogin from '../../assets/logoPrincipal.png';



export default function LoadingScreen (){

	return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Image source={logoLogin} style={{ opacity: 0.7, width: '80%', height: '30%'}}/>
                <ActivityIndicator color='#FCDE0F' size={70} />			
			</View>
	);
}
