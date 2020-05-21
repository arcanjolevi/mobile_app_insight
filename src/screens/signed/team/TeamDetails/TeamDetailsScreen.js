import * as React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';
import style from './style';

export default function TeamDetailsScreen ({ navigation, route }) {
  const { teamData } = route.params;
  const { teamInfo, teamMembersData } = teamData;
  const { name, institution, description } = teamInfo;

  return (
    <View style={style.container}>
      <View style={style.teamDetails}>
        <Text style={style.contentTitleText}>
          Nome:
        </Text>
        <Text style={style.contentText}>
          {name}
        </Text>

        <Text style={style.contentTitleText}>
          Local/Instituição
        </Text>
        <Text style={style.contentText}>
          {institution}
        </Text>

        <Text style={style.contentTitleText}>
          Descrição
        </Text>
        <Text style={style.contentText}>
          {description}
        </Text>

        <Text style={style.contentTitleText}>
          Integrantes
        </Text>


        <FlatList 
      	style={style.flatList}
        data={teamMembersData}
        showsVerticalScrollIndicator={false}
        keyExtractor={ item => String(item._id) }
        renderItem= { ({ item }) => (
					
          <View style={style.itemContainer}>
            <View style={style.itemTitleContainer}>
              <Ion name='md-person' color="#646464" size={45}/>
							<Text style={style.itemTitleText}>
                {item.name}
              </Text>
            </View>
              
            <TouchableOpacity onPress={ () => navigation.navigate('Integrante', { member: item })}>
              <Ion name='ios-more' color="#646464" size={30}/>
            </TouchableOpacity>
          </View>
        )}
      />
      </View>
      
    </View>
  );
}