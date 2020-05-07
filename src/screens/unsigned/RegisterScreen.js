import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';
import api from '../../services/api';
import LoadingScreen from '../LoadingScreen';


const styleTextInput = {
	marginBottom: 10,
	paddingLeft: 10,
	height: 60,
	borderRadius: 15,
	width: '75%',
	backgroundColor: '#f4f4f4'
}


export default function RegisterScreen({ navigation }) {


	const [ isLoading, setIsLoading] = useState(false);
	
	const [ name, setName ] = useState("");
	const [ institution, setInstitution ] = useState("");
	const [ whatsapp, setWhatsapp ] = useState("");
	const [ day, setDay ] = useState("");
	const [ month, setMonth ] = useState("");
	const [ year, setYear ] = useState("");
	const [ email, setEmail ] = useState("");
	const [ password, setPassword ] = useState("");

	const [ user, setUser ] = useState({	
		name: name, 
		email: email,
		institution: institution,
		whatsapp: whatsapp,
		bornDate: day + "/" + month + "/" + year,
		password: password	
	});

	useEffect( () => {
		setUser({
			name: name, 
			email: email,
			institution: institution,
			whatsapp: whatsapp,
			bornDate: day + "/" + month + "/" + year,
			password: password
		})
	}, [name, email, institution, whatsapp, day, month, year, password]);


	function alertCustom(text){
		Alert.alert( "Alerta!!", text );
	}


	async function register () {

		
		
		if(name.length < 2){
			alertCustom("Nome inválido");
			return ;
		}else if(institution.length < 2){
			alertCustom("Instituição de ensino inválida");
			return ;
		}else if(whatsapp.length < 8){
			alertCustom("WhatsApp inválido");
			return ;
		}else if(day > 31 || day.length > 2 || month > 12 || month.length > 2 || year.length != 4){
			alertCustom("Data de nascimento inválida");
			return ;
		}else if(email.length < 5 || !email.includes('@') || !email.includes('.com')){
			alertCustom("Email inválido");
			return ;
		}else if(password.length < 5){
			alertCustom("Senha inválida");
			return ;
		}else{
			setIsLoading(true);
			console.log(user);
			try {
				const response = await api.post('register', user);
				console.log(response.data);
				setIsLoading(false);
				if(!response.error){}
					Alert.alert(
						"Bem Vindo!!",
						"Você foi registrado com sucesso.",
						[
						{ text: "Fazer Login", onPress: () => navigation.navigate('Login') } 
						],
						{ cancelable: false }
					);
					
			} catch (error) {
				alert("Erro ao registrar");
			}
			
			
		}
		
	}

	function correctDate(){
		if(day.length == 1)
			setDay("0"+day);
		if(month.length == 1)
			setMonth("0"+month);
	}


	if(isLoading)
		return (
			<LoadingScreen />
		);

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
			<ScrollView showsVerticalScrollIndicator={false}  style={{width:'100%'}}>
				<View style={{ alignItems: 'center',width:"100%", backgroundColor: '#fff'}}>
					<View style={{marginTop:10, justifyContent: 'center', alignItems: 'center'}}>
						<Ion name="md-contact" color="#949494" size={150}/>
						<Text style={{ fontSize: 30, color: '#949494' , marginBottom: 20 }}>Nova Conta</Text>
					</View>          
					<TextInput placeholder='Nome completo' style={styleTextInput} onChangeText={ text => setName(text)} />
					<TextInput placeholder='Instiuição de ensino' style={styleTextInput} onChangeText={ text => setInstitution(text)} />            
					<TextInput placeholder='WhatsApp' keyboardType={'numeric'}  style={styleTextInput} onChangeText={ text => setWhatsapp(text)} />
					<Text style={{marginBottom: 5, marginLeft: 15, color: '#949494'}}>Data de nascimento</Text>
					<View style={{ width: '75%', flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between'}}>
						<TextInput placeholder='dia' maxLength={2} onEndEditing={correctDate} onChangeText={ text => setDay(text)} keyboardType={'numeric'} style={{width: '20%', backgroundColor: '#f4f4f4', borderRadius: 15, textAlign: 'center'}}></TextInput>
						<TextInput placeholder='mês' maxLength={2} onEndEditing={correctDate} onChangeText={ text => setMonth(text)} keyboardType={'numeric'} style={{width: '30%', backgroundColor: '#f4f4f4', borderRadius: 15, textAlign: 'center'}}></TextInput>
						<TextInput placeholder='ano' onChangeText={ text => setYear(text)} keyboardType={'numeric'} style={{width: '40%', backgroundColor: '#f4f4f4', borderRadius: 15, textAlign: 'center'}}></TextInput>
					</View>
					<TextInput placeholder='Email' onChangeText={ text => setEmail(text)} style={styleTextInput} />
					<TextInput placeholder='Password' onEndEditing={register} onChangeText={ text => setPassword(text)} secureTextEntry style={styleTextInput} />
					<TouchableOpacity onPress={ register } style={{ width: '75%', backgroundColor: '#4287f5', marginBottom: 10, borderRadius: 15, height: 60, justifyContent: 'center', alignContent: 'center'}}>
						<Text style={{ textAlign: 'center' , color: '#fff', fontWeight: 'bold'}}>Registrar</Text>
					</TouchableOpacity>
					<View style={{ backgroundColor: '#FFF', width:'100%', height: 400 }} />
				</View>
				
			</ScrollView>
		</View>
		);
	}
	