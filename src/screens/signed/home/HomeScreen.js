import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Text, View, FlatList, AsyncStorage, TouchableOpacity } from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';
import api from '../../../services/api';

const config = require('../../../config/config.json');

import AuthContext from '../../../contexts/Auth'; 

export default function HomeScreen() {

	const { downloadMessages, refreshing, messages } = useContext(AuthContext);
	
	function refresh(){
		downloadMessages();
	}

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