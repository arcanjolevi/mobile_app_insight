import React, { createContext, useState, useEffect } from 'react';
import { AsyncStorage, Alert } from 'react-native';
import api from '../services/api';
import { set } from 'react-native-reanimated';

export function AuthProvider ({ children }) {

	const [ isLoading, setIsLoading ] = useState(true);
	const [ isSigned, setIsSigned ] = useState(false);
	const [ userData, setUserData ] = useState({});
	const [ token, setToken ] = useState('');	
	const [ admin, setAdmin ] = useState(false);
	const [ team, setTeam ] = useState(false);
	const [ messages, setMessages ] = useState([]);
	const [ refreshing, setRefreshing ] = useState(false);
	const [ flagUpdatedUser, SetFlagUpdatedUser ] = useState(false);

	async function initAuth () {
		const t = await AsyncStorage.getItem('userToken');
		setToken(t);		
		console.log("Usuario Autenticado: ", (t != null));
		const userDataStorage = await AsyncStorage.getItem('userData');
		setUserData(JSON.parse(userDataStorage));	
		setIsSigned(!!t);
		setIsLoading(false);		
	}

	async function updateUserData(){
		setIsLoading(true);		
		try{
			const response = await api.get(`user/data/${userData._id}`);
			userData.team = response.data.team;
			userData.admin = response.data.admin;
			setAdmin(response.data.admin);
			console.log('Dados do usuário atualizados');
		}catch(e){
			console.log('Erro ao atualizar dados do usuario', e);
		}
		SetFlagUpdatedUser(true);
		console.log('User updated');
		downloadMessages();
		setIsLoading(false);
	} 

	async function downloadMessages(){
		setRefreshing(true);
		try{
			const response = await api.get('list/all/news');
			setMessages(response.data);
			await AsyncStorage.setItem('messages', JSON.stringify(messages));
		}catch(e){
			console.log('Erro ao baixar messages', e);
			try {
				const objStorage = await AsyncStorage.getItem('messages');
				setMessages(JSON.parse(objStorage));
			}catch(e2) {
				console.log('Erro ao carregar msgs do armazenamento', e2);
			}
		}
		setRefreshing(false);
	}

	useEffect( () => {	
		initAuth();
	}, []);

	async function downloadAppData(){
	
		try{
			const responseAllPlans = await api.get('list/all/plans');
			const responseAllPrays = await api.get('list/all/prays');
			console.log("Dados do app baixados");
			
			await AsyncStorage.setItem('allPlans', JSON.stringify(responseAllPlans.data));
			await AsyncStorage.setItem('allPrays', JSON.stringify(responseAllPrays.data));
			console.log("Dados do app armazenados");
		}catch(e){
			console.log('Erro ao carregar dados do app');		
		}
		
	}

	async function handleLogin(email, password){
		
		try {			
			const response = await api.post('login', { email: email, password:password });
			
			if(!response.data.error){
				console.log("Login realizado");
				await AsyncStorage.setItem('userToken', response.data.token);
				await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
				setToken(response.data.token);
				setUserData(response.data.user);
				setAdmin(userData.admin);
						
				
				try{
					const responsePrays = response.data.user.prays;
					const responsePlans = response.data.user.plans;
					await AsyncStorage.setItem('userPlans', JSON.stringify(responsePlans));
					await AsyncStorage.setItem('userPrays', JSON.stringify(responsePrays));	
					console.log("Dados do usuário armazenados");
				}catch(e){
					console.log('Error ao armazenar dados do usuario:', e);
				}
				await downloadAppData();
				downloadMessages();
				setIsSigned(true);
			}
		} catch (e) {
			console.log('Erro ao logar:', e);
			
			Alert.alert('Alerta', 'Não foi possível realizar o login');
		}
		setIsLoading(false);
	}

	async function handleSignOut(){
		await AsyncStorage.removeItem('userToken');
		await AsyncStorage.removeItem('userData');
		await AsyncStorage.removeItem('userPlans');
		await AsyncStorage.removeItem('userPrays');
		await AsyncStorage.removeItem('allPlans');
		await AsyncStorage.removeItem('allPrays');
		setIsLoading(false);
		setIsSigned(false);
	}

	function signIn (email, password) {
			setIsLoading(true);
			console.log('Sign In', email);
			handleLogin(email, password);
	}

	function signOut(){
			setIsLoading(true);
			console.log('Sign Out');
			handleSignOut();
	}

	

  return(
    <AuthContext.Provider value={
    	{ 
      	loading: isLoading, 
				signed: isSigned,
				token: token,
				user: userData,
				signIn,
				signOut,
				admin,
				team,
				updateUserData,
				flagUpdatedUser,
				downloadMessages,
				messages,
				refreshing
      }
    }>
      {children}
    </AuthContext.Provider>
  );
}

const AuthContext = createContext({
    signed: String,
    token: String,
    user: Object,
    signIn: Function,
    signOut: Function,
		loading: Boolean,
		user: Object,
		admin: Boolean,
		team: Boolean,
		updateUserData: Function,
		downloadMessages: Function,
		messages: Array,
		refreshing: Boolean,
		flagUpdatedUser: Boolean

});

export default AuthContext ;