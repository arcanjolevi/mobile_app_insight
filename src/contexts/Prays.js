import React, { useContext, createContext, useState, useEffect } from 'react';
import { AsyncStorage, Alert } from 'react-native';
import AuthContext from './Auth';
import api from '../services/api';

export function PraysProvider ({ children }) {
	const { token } = useContext(AuthContext);

	const [ isLoading, setIsloading ] = useState(false);
	const [ userPrays, setUserPrays ] = useState([]);
	const [ allPrays, setAllPrays ] = useState([]);
	const [ praysContent, setPraysContent ] = useState([]);
	
	

	async function init(){
		setIsloading(true);
		const stringUserPrays = await AsyncStorage.getItem('userPrays');
    const userPraysObj = JSON.parse(stringUserPrays);
		setUserPrays(userPraysObj);
		
		const stringAllPrays = await AsyncStorage.getItem('allPrays');
    const allPraysObj = JSON.parse(stringAllPrays);
		setAllPrays(allPraysObj);
		setIsloading(false);
	}

	useEffect(() => {
		init();
	}, []);

	useEffect(() => {
		loadContent();
	}, [allPrays, userPrays]);

	function loadContent(){
		if(allPrays && userPrays){
			var v = [];			
			allPrays.forEach( i => {
				var flag = false;
				userPrays.forEach( j => {
					if(j == i._id){
						flag = true;
					}
				});
				if(flag){
					v.push(i);
				}
			});		
			setPraysContent(v);
		}		
	}

	async function deletePray(prayID){
		var v = [];
		userPrays.forEach( x => {
			if(x != prayID){
				v.push(x);
			}else{
				try{                    
					api.post('delete/user/prays', {
							prayID: x
						},{ 
							headers: {
								token: token
						  }
					});
				}catch(e){
					console.log("Erro ao atualizar pray no servidor", e);
				}
			}
		});
		await AsyncStorage.setItem('userPrays', JSON.stringify(v));
		setUserPrays(v);
	}

	async function downloadPrays(){
		setIsloading(true);
		try{
			const response = await api.get('list/all/prays');
			setAllPrays(response.data);
			await AsyncStorage.setItem('allPrays', JSON.stringify(response.data));
		}catch(e){
			console.log('Erro ao baixar prays', e);
			const response = await AsyncStorage.getItem('allPrays');
			const obj = JSON.parse(response);
			setAllPrays(obj);
		}
		setIsloading(false);
	}

	async function updatePrays(prays){
		setIsloading(true);
		try {
			api.post('update/all/user/prays', {
					prays
				}, { 
				headers: {
					token: token
				}
			});
		} catch (error) {
			console.log(error);
			console.log("impossivel atualizar prays no servidor");
		}
		await AsyncStorage.setItem('userPrays', JSON.stringify(prays));
		setUserPrays(prays);
		setIsloading(false);
	}

	return(
	  <PraysContext.Provider value={{ 
				loading: isLoading,
				allPrays,
				userPrays,
				praysContent,
				deletePray,
				downloadPrays,
				updatePrays			
	  }}>
			{children}
	  </PraysContext.Provider>
	);
}

const PraysContext = createContext({
		loading: Boolean,
		allPrays: Array,
		userPrays: Array,
		praysContent: Array,
		deletePray: Function,
		downloadPrays: Function,
		updatePrays: Function
});

export default PraysContext ;