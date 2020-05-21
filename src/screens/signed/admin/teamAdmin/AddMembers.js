import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, View, TextInput, Text, TouchableOpacity } from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';

import AdminContext from '../../../../contexts/Admin';

const styleTextInput = {
	marginBottom: 10,
	paddingLeft: 10,
	height: 60,
	borderRadius: 15,
	width: '100%',
	backgroundColor: '#f4f4f4'
}


function sort(array){
	for(let i = array.length; i > 0;i--){
  	for(let j = 0; j < i - 1; j++){
			if(array[j].name > array[j+1].name){
				let t = array[j];
				array[j] = array[j+1];
				array[j+1] = t;
			}
		}
	}  
	return array;  
}


export default function AddMembers ({ navigation, route }){
	const { 
		users,
		downloadUsers, 
		loading,
		downloadUsersWithoutTeam,
		usersWithoutTeam,
		addTeamToMember,
		refreshing
	} = useContext(AdminContext);
	const [ usersToshow, setUsersToShow ] = useState([]);
	const { teamID } = route.params;
	
	function handlerAddMember(userID){
		addTeamToMember(userID, teamID);
		navigation.goBack();
	}

	function refresh(){
		downloadUsersWithoutTeam();
	}

	useEffect(() => {
		refresh();
	}, []);

	useEffect(() => {
		sort(usersWithoutTeam);
	}, [usersWithoutTeam]);
	
	
  return(
    <View style={{ paddingLeft:20, paddingTop:20, flex: 1,  backgroundColor: '#fff' }}>
			<FlatList 
				onRefresh={refresh}
				refreshing={refreshing}
      	style={{ width: '95%'}}
        data={usersWithoutTeam}
        showsVerticalScrollIndicator={false}
        keyExtractor={ item => String(item._id) }
        renderItem= { ({ item }) => (
					<View style={{ backgroundColor: '#FFF'}}>
						<TouchableOpacity 
							onPress={ () => handlerAddMember(item._id)}
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
								<Ion name='md-person' color="#646464" size={45}/>
								<Text style={{ marginLeft: 10, fontSize: 20, color: '#646464'}}>{item.name}</Text>
              </View>
              
              
						</TouchableOpacity>
					</View> 
        )}
      />
    </View>
  );
}