import * as React from 'react';
import { useContext } from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';
import { AsyncStorage } from 'react-native';

import AuthContext from '../../../contexts/Auth';

const config = require('../../../config/config.json');

export default function Settings ({ navigation }){
	const { signOut, admin } = useContext(AuthContext);

	function isAdmin(){
		if(admin)
			return(
			 <View>
				<TouchableOpacity 
					onPress={ navigation.navigate('Admin')}
					style={{ 
						paddingRight: 20,
						alignItems: 'center',
						flexDirection: 'row',
						paddingLeft: 10,
						justifyContent: 'flex-start',
						height: 60,
						borderBottomColor: '#d4d4d4',
						borderBottomWidth: 1 
					}}
				>
					<Ion name={'md-settings'} color="#646464" size={45}/>
					<Text style={{ marginLeft: 10, fontSize: 20, color: '#646464'}}>Administrar</Text>
				</TouchableOpacity>
		</View>
	
		);
	}

    return (
    	<View style={{ backgroundColor: config.backgroungColor, flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
    		<View style={{ marginBottom: 10 }}></View>
			<ScrollView showsVerticalScrollIndicator={false} style={{ width: '95%'}}>
				<View style={{ marginBottom: 5, width: '100%', backgroundColor: '#fff', elevation: 3 }}>
					<ConfigObject 
						title={ 'Meu perfil' }
						iconName={ 'md-contact' }
						navigation={ navigation } 
						action={ () => navigation.navigate('Profile') }
					/>
					<ConfigObject 
						title={ 'Sobre' } 
						iconName={ 'ios-information-circle' } 
						navigation={ navigation } 
						action={ () => navigation.navigate('Info') }
					/>{ admin? 
						<ConfigObject 
						title={ 'Administrar' } 
						iconName={ 'md-settings' } 
						navigation={ navigation } 
						action={ () => navigation.navigate('Admin')}							
					/>	: <View /> }
					<ConfigObject 
						title={ 'Terminar sessão' } 
						iconName={ 'md-exit' } 
						navigation={ navigation } 
						action={signOut}							
					/>					
				</View>	
				
				
            </ScrollView>
			
			
      	</View>
    );
}
/*
<ConfigObject title={'Meu perfil'} iconName={'md-contact'}/>
<ConfigObject title={'Minha equipe'} iconName={'ios-people'}/>
<ConfigObject title={'Sobre'} iconName={'ios-information-circle'}/>
*/

function ConfigObject ({title, iconName , navigation, action }) {
	
	return (
		<TouchableOpacity 
			onPress={ action }
			style={{ 
				paddingRight: 20,
				alignItems: 'center',
				flexDirection: 'row',
				paddingLeft: 10,
				justifyContent: 'flex-start',
				height: 60,
				borderBottomColor: '#d4d4d4',
				borderBottomWidth: 1 
			}}
		>
			<Ion name={iconName} color="#646464" size={45}/>
			<Text style={{ marginLeft: 10, fontSize: 20, color: '#646464'}}>{title}</Text>
		</TouchableOpacity>
	);
}