import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Alert, ActivityIndicator, FlatList, View, TextInput, Text, TouchableOpacity } from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';
const config = require('../../../../config/config.json');

import AdminContext from '../../../../contexts/Admin';

const styleTextInput = {
	marginBottom: 10,
	paddingLeft: 10,
	height: 60,
	borderRadius: 15,
	width: '100%',
	backgroundColor: '#f4f4f4'
}

export default function MessagesScreen ({ navigation }){
  const { messages, downloadMessages, refreshing, deleteMessage } = useContext(AdminContext);

  

  
  function handleDelete(newsID){
		Alert.alert(
		"Atenção",
		"Tem certeza que deseja eliminar essa mensagem?",
			[
				{
					text: "Cancelar",
					style: "cancel"
				},
				{
					text: "Sim", onPress: () => deleteMessage(newsID)
				}
			]
		);
	}

  async function refresh(){    
    await downloadMessages();
  }

  useEffect(() => {
    refresh();
  }, []);

  

/*
  if(loading)
	return(
		<View style={{ marginTop: 20 }}>
			<ActivityIndicator color='#FCDE0F' size={40}/>
		</View>
	);
*/

  return(
    <View style={{  flex: 1,  alignItems: 'center',  backgroundColor: config.backgroungColor }}>
      <View style={{ elevation: 5, flexDirection: 'row', justifyContent:'space-between', marginTop: 15, height:60, alignItems: 'center', width: '95%', backgroundColor: '#fff'}}>
      	<Text style={{marginLeft: 10, fontWeight: 'bold', fontSize: 20 }}>Nova Notícia</Text>
				<TouchableOpacity style={{ marginRight: 15}} onPress={ () => navigation.navigate('Nova Notícia')}>
        	<Ion name="ios-add-circle-outline" size={50}/>
        </TouchableOpacity>
      </View>
      
      <FlatList 
        refreshing = { refreshing }
        onRefresh={refresh}
      	style={{ width: '100%'}}
        data={messages}
        showsVerticalScrollIndicator={false}
        keyExtractor={ item => String(item._id) }
        renderItem= { ({ item }) => (
          <View style={{elevation:5, paddingBottom: 10, marginTop: 10, paddingLeft: 10, alignItems: 'center', marginBottom: 10, width: '100%',  backgroundColor: '#fff', elevation: 1}}>
        <View style={{ marginTop: 15, marginLeft: 15, width:'100%'}}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{item.title}</Text>
        </View>
        <View style={{ padding: 10, width:'100%'}}>
          <Text style={{ textAlign:'center', fontSize: 15 }}>
            {item.body}
          </Text>
        </View>
        
        <View style={{ width:'100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text style={{ color:'#646464', fontSize: 15 }}>{item.author}</Text>
          <View style={{ marginRight: 15, flexDirection: 'row', width: '25%', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Editar', { message:item })}>
              <Ion name="ios-build" color="#949494" size={50}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item._id)}>
              <Ion name="md-trash" color="#949494" size={50}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>

        )}
      />
      
      


		</View>
  );
}