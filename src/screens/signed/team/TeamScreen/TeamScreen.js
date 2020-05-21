import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, FlatList, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';
import api from '../../../../services/api';

import style from './style';

export default function TeamScreem ({ navigation }) {
	const [ refreshing, setRefreshing ] = useState(false);
	const [ teamsData, setTeamsData ] = useState([]);

	async function refresh(){
		setRefreshing(true);
		try {
			const response = await api.get('list/all/teams/data');
			setTeamsData(response.data);
		} catch (e) {
			console.log(e);
		}
		setRefreshing(false);
		
	}

	useEffect(() => {
		refresh();
	}, []);

  return (
    <View style={style.container}>
			<FlatList 
				onRefresh={refresh}
				refreshing={refreshing}
      	style={style.flatList}
        data={teamsData}
        showsVerticalScrollIndicator={false}
        keyExtractor={ item => String(item) }
        renderItem= { ({ item }) => (
					<View style={style.itemContainer}>
						<TouchableOpacity 
							onPress={ () => navigation.navigate('Detalhes', { teamData: item })}
							style={style.itemTouchableOpacity}
						>						
							<View style={style.iconAndTextContainer}>
								<Ion 
									name='ios-people'
									color="#646464"
									size={45}
								/>
								<Text style={style.teamText}>
									{item.teamInfo.name}
								</Text>
              </View>
						</TouchableOpacity>
					</View> 
        )}
      />
    </View>
  );
}