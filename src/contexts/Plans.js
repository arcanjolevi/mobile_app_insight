import React, { useContext, createContext, useState, useEffect } from 'react';
import { AsyncStorage, Alert } from 'react-native';
import api from '../services/api';
import AuthContext from './Auth';

export function PlansProvider ({ children }) {
	const { token } = useContext(AuthContext);

	const [ isLoading, setIsloading ] = useState(false);
	const [ userPlans, setUserPlans ] = useState([]);
	const [ plansContent, setPlansContent ] = useState([]);
	const [ allPlans, setAllPlans ] = useState([]);

	

	async function init(){
		setIsloading(true);
		const allPlansStorage = JSON.parse(await AsyncStorage.getItem('allPlans'));
		const userPlansStorage = JSON.parse(await AsyncStorage.getItem('userPlans'));
		setUserPlans(userPlansStorage);
		setAllPlans(allPlansStorage);
		
		setIsloading(false);
	}

	function updateContent(){
		if(allPlans && userPlans){
			var v = [];
			userPlans.forEach( u => {
				const [ planID, planStep ] = u.split(',');
				allPlans.forEach( a => {
					if(planID == a._id){					
						var text = "";
						var percent = 0.0;
						var complete = false;
						if(planStep >= a.totalSteps){
							text = "Finalizado";
							percent = 100.0;
							complete = true;
						}else{
							text = a.plan[planStep].text;
							percent = parseFloat((planStep * 100 / a.totalSteps).toFixed(2));
							complete = false;
						}

						v.push({
							id: a._id,
							title: a.title,
							description: a.description,
							planSteps: "aqui",//a.plan,
							totalSteps: a.totalSteps,
							atualStep: planStep,
							atualText: text,
							percent,
							complete
						});
					}
					
				});
			
			});

			setPlansContent(v);
		}
	}

	useEffect(() => {
		init();
	}, []);

	useEffect(() => {
		updateContent();
		
	}, [userPlans, allPlans]);

	async function updatePlanStep(planID, planStep, totalSteps){
		
		if(planStep <= totalSteps && planStep >= 0){
			var v = [];
			userPlans.forEach( u => {
				const [ userPlanID, userPlanStep ] = u.split(',');
				if(planID == userPlanID){
					v.push(`${planID},${planStep}`);
				}else{
					v.push(u);
				}
			});

			await AsyncStorage.setItem('userPlans', JSON.stringify(v));
			setUserPlans(v);

			try {
				api.post('update/user/plans', {
								planID: planID,
								step: planStep
						}, { 
								headers: {
										token: token
								}
				});
			} catch (error) {
				console.log(error);
				console.log("impossivel atualizar plano no servidor");
			}

		}
	}

	async function deletePlan(planID){
		var v = [];
    userPlans.forEach(u => {
			const [ userPlanID, userPlanStep ] = u.split(',');
      if(userPlanID != planID)
        v.push(u);
		});
		
    await AsyncStorage.setItem('userPlans', JSON.stringify(v));
    setUserPlans(v);

    try {
    	api.post('delete/user/plans', {                
      	planID: planID
      },{
      	headers: {
        	token: token
        }
    	});
    } catch (error) {
    	console.log(error);
      console.log("impossivel remover plano no servidor");
		}		
	}

	async function updateUserPlans(plans){
		setIsloading(true);
		var v = [];
		plans.forEach( p => {
			var flag = false;
			userPlans.forEach( u => {
				const [ userPlanID, userPlanStep ] = u.split(',');
				if(userPlanID == p){
					v.push(u);
					flag = true;
				}					
			});
			if(!flag){
				v.push(`${p},0`);
			}
		});
		console.log('oi', v);
		try {
    	api.post('update/all/user/plans', {                
      	plans: v
      },{
      	headers: {
        	token: token
        }
    	});
    } catch (error) {
    	console.log(error);
      console.log("impossivel atualizar planos no servidor");
		}	

		setUserPlans(v);
		await AsyncStorage.setItem('userPlans', JSON.stringify(v));
		setIsloading(false);
	}


	async function downloadPlans(){
		setIsloading(true);
		try {
			const response = await api.get('list/all/plans');
			setAllPlans(response.data);
			await AsyncStorage.setItem('allPlans', JSON.stringify(response.data));
		} catch (error) {
			console.log(error);
			const response = await AsyncStorage.getItem('allPlans');
			const obj = JSON.parse(response);
			setAllPlans(obj);
		}
		setIsloading(false);
	}

	return(
	  <PlansContext.Provider value={{ 
				loading: isLoading,
				plansContent, 
				updatePlanStep,
				deletePlan,
				downloadPlans,
				allPlans,
				userPlans,
				updateUserPlans
	  }}>
			{children}
	  </PlansContext.Provider>
	);
}

const PlansContext = createContext({
		loading: Boolean,
		plansContent: Array,
		updatePlanStep: Function,
		deletePlan: Function,
		downloadPlans: Function,
		allPlans: Array,
		userPlans: Array,
		updateUserPlans: Function
});

export default PlansContext ;