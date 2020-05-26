import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Text, FlatList, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';

import style from './style';

import TeamContext from '../../../../contexts/Teams';

export default function TeamScreem ({ navigation }) {

	const { downloadTeams, refreshing, teamsData } = useContext(TeamContext);

	function refresh(){
		downloadTeams();
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