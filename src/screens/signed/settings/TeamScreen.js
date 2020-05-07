import * as React from 'react';
import { useState } from 'react';
import { TextInput, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';
const config = require('../../../config/config.json');
export default function TeamScreen ({ navigation }){
    return (
      <View style={{ flex: 1, alignItems: 'center', backgroundColor: config.backgroungColor }}>
           
            <View style={{ marginTop: 10, width: '95%', backgroundColor: '#fff', padding: 10 }}>
                <Text style={{ color: '#848484', fontSize: 15, textAlign: 'center' }}>Entre em contato com seu líder, sua equipe ainda não foi configurada.</Text>
            </View>
            
      </View>
    );
}





const style = {
  headerText: {
      marginLeft: 30,
      fontWeight: 'bold',
      fontSize: 25,
      color: '#646464'
  },
  headerView: {
      elevation: 5,
      marginBottom: 5,
      justifyContent: 'center',
      marginTop: 15,
      height:50,
      alignItems: 'center',
      width: '95%',
      backgroundColor: '#fff',
      justifyContent: 'center'
  },
  masterView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center' 
  }
}