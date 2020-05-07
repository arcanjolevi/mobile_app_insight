import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { ActivityIndicator, Alert, FlatList, Text, View, TouchableOpacity } from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';

import PlansContext from '../../../contexts/Plans';

const config = require('../../../config/config.json');

export default function AllPlansScreen ({ route, navigation }){

	const { 
		loading,
		downloadPlans,
		allPlans,
		userPlans,
		updateUserPlans
	} = useContext(PlansContext);


	const [ plansToShow, setPlansToShow ] = useState([]);

	useEffect( () => {		
		downloadPlans();
	}, []);

	useEffect(() => {
		updatePlansToShow();
	}, [userPlans, allPlans]);


	function updatePlansToShow(){
		var v = [];
		if(allPlans && userPlans){
			allPlans.forEach( a => {
				var aux = a;
				userPlans.forEach( u => {
					const [ planID, planStep ] = u.split(',');
					if(planID == a._id){					
						a.participando = true;
					}
				});
				v.push(aux);
			});
			setPlansToShow(v);
		}
		
	}
	

	function confirmChange(item){

		if(item.participando){
			Alert.alert(
			"Cuidado",
			"Tem certeza que deseja abandonar esse plano?",
				[
					{
						text: "Cancelar",
						style: "cancel"
					},
					{
						text: "Sim", onPress: () => updateParticipando(item)
					}
				]
		 	);
		}else{
			updateParticipando(item);
		}			
	}

	function updateParticipando(item) {
		var v = [];
		plansToShow.forEach( x => {
			var w = x;	
			if(x == item){
				w.participando = !x.participando;
			}			
			v.push(w);
		});		
		setPlansToShow(v);		
	}

	function styleParticipando(item){
		if(item.participando)
			return ({ width: '50%', backgroundColor: '#FCDE0F', marginBottom: 10, borderRadius: 15, height: 40, justifyContent: 'center', alignContent: 'center'})
		else
			return ({ width: '50%', backgroundColor: '#c4c4c4', marginBottom: 10, borderRadius: 15, height: 40, justifyContent: 'center', alignContent: 'center'})		
	}

	function updateBtnParticipar(item){
		if(item.participando)
			return "Participando";
		else
			return "Participar";
	}

	function updateAndGoBack(){
		var v = [];
		plansToShow.forEach( x => {
			if(x.participando){
				v.push(x._id);
			}
		});
		console.log('planos novos:', v);
		updateUserPlans(v);
		navigation.popToTop();
	}

	if(loading)
		return(
			<View style={{ marginTop: 20 }}>
				<ActivityIndicator color='#FCDE0F' size={40}/>
			</View>
		);

  return (
      	<View style={{ backgroundColor: config.backgroungColor, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={style.headerView} onPress={ () => updateAndGoBack()}>
              <Text style={{ fontSize: 20,  marginRight: 5, color: '#545454'}}>Salvar</Text>
							<Ion name="md-color-wand" color="#949494" size={30}/>
            </TouchableOpacity>
            <FlatList
            style={{ width: '95%'}}
                data={plansToShow}
                showsVerticalScrollIndicator={false}
                keyExtractor={ item => String(item._id) }
                renderItem= { ({ item }) => (
					<View style={{paddingLeft: 10, alignItems: 'center', marginBottom: 10, width: '100%', height: 180, backgroundColor: '#fff', elevation: 1}}>
        				<View style={{marginTop: 5, marginLeft: 15, marginBottom: 0,  width: '100%'}}>
            				<View style={{flexDirection: 'row'}}>
            					<Ion name="ios-bookmarks" color="#949494" size={30}/>
            					<Text style={{marginLeft: 5, color: '#848484', fontWeight: 'bold', fontSize: 20}}>{item.title}</Text>
            				</View>
            				<Text style={{color: '#848484'}}>Total de trechos: {item.totalSteps}</Text>
          				</View>
						<Text style={{ marginBottom: 5, fontSize: 20, color: '#848484'}}>{item.description}</Text>
          				<View style={{ marginTop: 10, width: '100%', flexDirection: 'row', justifyContent: 'space-between'}}>
			  				<TouchableOpacity onPress={() => confirmChange(item)} style={styleParticipando(item)}>
                				<Text style={{ textAlign: 'center' , color: '#747474', fontWeight: 'bold'}}>{updateBtnParticipar(item)}</Text>
          					</TouchableOpacity>
							<TouchableOpacity onPress={ () => navigation.navigate('Detalhes', { plan: item })}>
								<Ion style={{ marginRight: 20 }} name="ios-arrow-dropright-circle" color="#949494" size={40}/>
							</TouchableOpacity>
	        			</View>
      				</View>
				)}
            />
      	</View>
    );
}

const style = {
  headerText: {
      marginLeft: 30,
      fontWeight: 'bold',
      fontSize: 25,
      color: '#646464'
  },
  headerView: {
      elevation: 5,
      marginBottom: 15,
      flexDirection: 'row',
      marginTop: 15,
      height:50,
      alignItems: 'center',
      width: '95%',
      backgroundColor: '#fff',
      justifyContent: 'center'
  },
  masterView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center' 
  }
}