import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, FlatList, AsyncStorage, TouchableOpacity } from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';
import api from '../../../services/api';

const config = require('../../../config/config.json');



export default function HomeScreen() {
	
	const [ refreshing, setRefreshing ] = useState(false);
	const [ messages, setMessages ] = useState([]);

	async function refresh(){
		setRefreshing(true);
		try{
			const response = await api.get('list/all/news');
			setMessages(response.data);
			await AsyncStorage.setItem('messages', JSON.stringify(messages));
		}catch(e){
			console.log(e);
			try {
				const objStorage = await AsyncStorage.getItem('messages');
				setMessages(JSON.parse(objStorage));
			}catch(e2) {
				console.log(e2);
			}
		}
		setRefreshing(false);
	}

	useEffect(() => {
		refresh();
	}, []);

  return (
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
          
        </View>
      </View>

        )}
      />
  );
}