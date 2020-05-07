import * as React from 'react';
import { useState } from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';
const config = require('../../../config/config.json');
export default function InfoScreen ({ navigation }){
    return (
      <View style={{ backgroundColor: config.backgroungColor, flex: 1, alignItems: 'center' }}>
            
            <View style={{ marginTop: 10, width: '95%', backgroundColor: '#fff', padding: 10 }}>
                <Text style={{ color: '#848484', fontSize: 15, textAlign: 'center' }}>App Insight versão Beta 1.1.0</Text>
                <Text style={{ color: '#848484', fontSize: 15, textAlign: 'center' }}>Contato equipe de desenvolvimento: equipe.app.insight@gmail.com</Text>
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