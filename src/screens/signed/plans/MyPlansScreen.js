import * as React from 'react';
import { useState, useContext } from 'react';
import { Alert, Text, View, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';

import PlansContext from '../../../contexts/Plans';

const config = require('../../../config/config.json');

import { AnimatedCircularProgress } from  'react-native-circular-progress';

export default function MyPlansScreen({ route, navigation }) {    

  const { 
    plansContent, 
    updatePlanStep,
    deletePlan,
    loading
  } = useContext(PlansContext);

  function confirmDeletePlan( planID ){
    Alert.alert(
      "Cuidado",
      "Tem certeza que deseja excluir esse plano?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { 
					text: "Sim", onPress: () => deletePlan(planID)
				}
			]
     );
	}



	if(loading)
		return(
			<View style={{ marginTop: 20 }}>
				<ActivityIndicator color='#FCDE0F' size={40}/>
			</View>
		);

  return (
  	<View style={{ backgroundColor: config.backgroungColor, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    	<View style={{ elevation: 5, marginBottom: 15, flexDirection: 'row', justifyContent:'space-between', marginTop: 15, height:60, alignItems: 'center', width: '95%', backgroundColor: '#fff'}}>
      	<Text style={{marginLeft: 10, fontWeight: 'bold', fontSize: 20 }}>Planos de leitura</Text>
				<TouchableOpacity style={{ marginRight: 15}} onPress={ () => navigation.navigate('Planos')}>
        	<Ion name="ios-add-circle-outline" size={50}/>
        </TouchableOpacity>
      </View>
            
      <FlatList 
      	style={{ width: '95%'}}
        data={plansContent}
        showsVerticalScrollIndicator={false}
        keyExtractor={ item => String(item.id) }
        renderItem= { ({ item }) => (
					<View style={{alignItems: 'center', marginBottom: 10, width: '100%', height: 320, backgroundColor: '#fff', elevation: 1}}>
          	<View style={{marginTop: 5, marginLeft: 15, marginBottom: 10,  width: '100%'}}>
          		<View style={{flexDirection: 'row', justifyContent:'space-between'}}>
          			<View style={{flexDirection: 'row'}} >
          				<Ion name="ios-bookmarks" size={30}/>
          				<Text style={{marginLeft: 5, fontWeight: 'bold', fontSize: 20}}>{item.title}</Text>
          			</View>
          		 	<TouchableOpacity onPress={() => confirmDeletePlan(item.id)}>
                	<Ion style={{ marginRight: 25 }} name="md-trash" color="#949494" size={30}/>
                </TouchableOpacity>
              </View>
              <Text style={{color: '#848484'}}>{item.description}</Text>
            </View>   
            <AnimatedCircularProgress
            	size={120}
              width={10}
              fill={item.percent}
              tintColor="#FCDE0F"
              rotation={0}
              backgroundColor="#949494" 
              children={ () => {
              	return (
                	<Text style={{fontSize: 24, color: '#949494' }}>{item.percent}%</Text>
                );
              }} 
              style={{marginBottom: 10 }}     
            />
            	<Text style={{ fontSize: 15, color: '#848484'}}>Trecho atual</Text>
              <Text style={{ marginBottom: 5, fontSize: 20 }}>{item.atualText}</Text>
              
							<View style={{justifyContent:'space-between', flexDirection:'row', width:'100%', height: 50 , marginTop: 10 }}>
              	<TouchableOpacity onPress={() => updatePlanStep(item.id, parseInt(item.atualStep) - 1, item.totalSteps)} style={{ marginLeft: 30,  width: '30%', backgroundColor: '#4287f5', marginBottom: 10, borderRadius: 15, height: 40, justifyContent: 'center', alignContent: 'center'}}>
                	<Text style={{ textAlign: 'center' , color: '#fff', fontWeight: 'bold'}}>Retroceder</Text>
                </TouchableOpacity> 
                <TouchableOpacity onPress={() => updatePlanStep(item.id, parseInt(item.atualStep) + 1, item.totalSteps)} style={{ marginRight: 30, width: '30%', backgroundColor: '#4287f5', marginBottom: 10, borderRadius: 15, height: 40, justifyContent: 'center', alignContent: 'center'}}>
                	<Text style={{ textAlign: 'center' , color: '#fff', fontWeight: 'bold'}}>Avançar</Text>
                </TouchableOpacity> 
            </View>
          </View>
        )}
      />
    </View>
  );
}

