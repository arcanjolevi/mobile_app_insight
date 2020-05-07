import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { Button, Alert, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import logoLogin from '../../../assets/logoPrincipal.png';


import AuthContext from '../../contexts/Auth';


export default function LoginScreen({ navigation }) {

	const { signIn } = useContext(AuthContext);
	
	const [ email, setEmail] = useState("");
	const [ password, setPassword] = useState("");

	async function handleLogin(){		
		
		if(email.length < 5 || password.length < 4){
			Alert.alert("Alerta", "Dados inválidos");
		}else{
			signIn(email, password);
		}
	}	
	
    return (
    	<View style={{ flex: 1,  alignItems: 'center', backgroundColor: '#FFF'}}>  
        	<Image source={logoLogin} style={{ opacity: 0.7, width: '80%', height: '30%', marginTop: '25%'}}/>
        	<View style={{ height: '5%' }}/>
        	<TextInput placeholder='Email' onChangeText={ text => setEmail(text) }  style={{ marginBottom:10, paddingLeft: 10, height: 60, borderRadius: 15, width: '75%', backgroundColor: '#f4f4f4'}}/>
        	<TextInput placeholder='Password' onChangeText={ text => setPassword(text) } secureTextEntry style={{ marginBottom: 10, paddingLeft: 10, height: 60, borderRadius: 15, width: '75%', backgroundColor: '#f4f4f4'}}/>
        	<TouchableOpacity onPress={handleLogin}  style={{ width: '75%', backgroundColor: '#4287f5', marginBottom: 10, borderRadius: 15, height: 60, justifyContent: 'center', alignContent: 'center'}}>
        	  <Text style={{ textAlign: 'center' , color: '#fff', fontWeight: 'bold'}}>Log in</Text>
        	</TouchableOpacity>       
        	<TouchableOpacity style={{ marginBottom: 5 }} onPress={ () => navigation.navigate('ForgotPassword')}>
        	  <Text style={{ color: '#949494'}}>Esqueceu a senha?</Text>
        	</TouchableOpacity>
        	<TouchableOpacity onPress={ () => navigation.navigate('Register')}>
        	  <Text style={{ color: '#949494'}} >Registrar-se</Text>
        	</TouchableOpacity>        
      	</View>
    );
}

