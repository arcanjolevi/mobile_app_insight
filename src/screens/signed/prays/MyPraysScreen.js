import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { ActivityIndicator, Alert, FlatList, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';
import { AsyncStorage } from 'react-native';;
import api from '../../../services/api';

import PraysContext from '../../../contexts/Prays';

const config = require('../../../config/config.json');

export default function MyPrayersScreen ({ route, navigation }){
	const { praysContent, loading, deletePray } = useContext(PraysContext);
	
	function confirmDeletePray(prayID){
		Alert.alert(
			"Cuidado",
			"Tem certeza que deseja excluir?",
			[
				{
					text: "Cancelar",
					style: "cancel"
				},
				{ 
					text: "Sim", onPress: () => deletePray(prayID)
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
		<View style={ style.masterView }>
			<View style={ style.headerView }>
				<Text style={style.headerText}>
					Planos de Jejum e Oração
				</Text>
				<TouchableOpacity style={{ marginRight: 15}} onPress={ () => navigation.navigate('Planos')}>
					<Ion name="ios-add-circle-outline"  size={50}/>
				</TouchableOpacity>
			</View>
			<FlatList 
				style={{ width: '95%'}}
				data={praysContent}
				showsVerticalScrollIndicator={false}
				keyExtractor={ item => String(item._id) }
				renderItem= { ({ item }) => (
					<View style={{alignItems: 'center', marginBottom: 10, width: '100%', height: 100, backgroundColor: '#fff', elevation: 1}}>
						<View style={{marginTop: 5, marginLeft: 15, marginBottom: 0,  width: '100%'}}>
							<View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
								<View style={{ flexDirection: 'row' }}>
									<Ion name="ios-bonfire"  size={30}/>
									<Text style={{marginLeft: 5, fontWeight: 'bold', fontSize: 20}}>{item.title}</Text>
								</View>
								<TouchableOpacity onPress={() => confirmDeletePray(item._id)}>
									<Ion style={{ marginRight: 25 }} name="md-trash" color="#949494" size={30}/>
								</TouchableOpacity>
							</View>
							<Text style={{color: '#848484'}}>Equipe: {item.team}</Text>
						</View>
						<Text style={{ marginBottom: 5, fontSize: 25, color: '#343434'}}>{item.description}</Text>
					</View>
				)}
			/>
		</View>
	);
}
				
const style = {
	headerText: {
		marginLeft: 10,
		fontWeight: 'bold',
		fontSize: 20
	},
	headerView: { elevation: 5,
		marginBottom: 15,
		flexDirection: 'row',
		justifyContent:'space-between',
		marginTop: 15,
		height:60,
		alignItems: 'center',
		width: '95%',
		backgroundColor: '#fff'},
	masterView: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: config.backgroungColor 
	}
}