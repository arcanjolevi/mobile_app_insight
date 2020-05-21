import * as React from 'react';
import { useContext, useEffect } from 'react';
import { Alert, ActivityIndicator, Image, View, TouchableOpacity, Text, ScrollView, FlatList } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import Ion from 'react-native-vector-icons/Ionicons';
const config = require('../../../../config/config.json');

import AdminContext from '../../../../contexts/Admin';

export default function TeamsAdminSreen ({ navigation }) {
	const { downloadTeams, teams, deleteTeam, refreshing } = useContext(AdminContext);


	function handleDelete(id){
		Alert.alert(
		"Atenção",
		"Tem certeza que deseja eliminar essa equipe?",
			[
				{
					text: "Cancelar",
					style: "cancel"
				},
				{
					text: "Sim", onPress: () => deleteTeam(id)
				}
			]
		);
	}

	async function refresh(){
		downloadTeams();
	}

	useEffect(() => {
		refresh();
	}, []);


  return(
    <View style={{ backgroundColor: config.backgroungColor, flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>			
			<View style={{ elevation: 5, marginBottom: 15, flexDirection: 'row', justifyContent:'space-between', marginTop: 15, height:60, alignItems: 'center', width: '95%', backgroundColor: '#fff'}}>
      	<Text style={{marginLeft: 10, fontWeight: 'bold', fontSize: 20 }}>Adicionar Equipe</Text>
				<TouchableOpacity style={{ marginRight: 15}} onPress={ () => navigation.navigate('Add Equipe')}>
        	<Ion name="ios-add-circle-outline" size={50}/>
        </TouchableOpacity>
      </View>
			<FlatList 
				refreshing={refreshing}
				onRefresh={refresh}
      	style={{ width: '95%'}}
        data={teams}
        showsVerticalScrollIndicator={false}
        keyExtractor={ item => String(item._id) }
        renderItem= { ({ item }) => (
					<View style={{ backgroundColor: '#FFF'}}>
						<TouchableOpacity 
							onPress={ () => navigation.navigate('Manutenção', { teamID: item._id })}
							style={{ 
								paddingRight: 20,
								alignItems: 'center',
								flexDirection: 'row',
								paddingLeft: 10,
								justifyContent: 'space-between',
								height: 60,
								borderBottomColor: '#d4d4d4',
								borderBottomWidth: 1 
							}}
						>
						
							<View style={{ flexDirection: 'row', alignItems:'center'}}>
							<Ion name='ios-people' color="#646464" size={45}/>
							<Text style={{ marginLeft: 10, fontSize: 20, color: '#646464'}}>{item.name}</Text>
              </View>
              
              <TouchableOpacity onPress={ () => handleDelete(item._id)}>
                  <Ion name='md-trash' color="#646464" size={35}/>
                </TouchableOpacity>
						</TouchableOpacity>
					</View> 
        )}
      />
    </View>
  );
}
