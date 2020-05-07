import * as React from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';
const config = require('../../../../config/config.json');

const styleTextInput = {
	marginBottom: 10,
	paddingLeft: 10,
	height: 60,
	borderRadius: 15,
	width: '100%',
	backgroundColor: '#f4f4f4'
}

export default function MessagesScreen ({ navigation }){
  return(
    <View style={{  flex: 1,  alignItems: 'center',  backgroundColor: config.backgroungColor }}>
      <View style={{ elevation: 5, flexDirection: 'row', justifyContent:'space-between', marginTop: 15, height:60, alignItems: 'center', width: '95%', backgroundColor: '#fff'}}>
      	<Text style={{marginLeft: 10, fontWeight: 'bold', fontSize: 20 }}>Nova Mensagem</Text>
				<TouchableOpacity style={{ marginRight: 15}} onPress={ () => navigation.navigate('Nova Mensagem')}>
        	<Ion name="ios-add-circle-outline" size={50}/>
        </TouchableOpacity>
      </View>
      
      
      
      <View style={{elevation:5, paddingBottom: 10, marginTop: 10, paddingLeft: 10, alignItems: 'center', marginBottom: 10, width: '100%',  backgroundColor: '#fff', elevation: 1}}>
        <View style={{ marginTop: 15, marginLeft: 15, width:'100%'}}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Bem vindo ao App Insight</Text>
        </View>
        <View style={{ padding: 10, width:'100%'}}>
          <Text style={{ textAlign:'center', fontSize: 15 }}>Essa é a primeira versão do app Insight. Estamos ainda em fase de desenvolvimento e novas atualizações virão em breve. Que Deus te abençoe!!</Text>
        </View>
        <Ion name="ios-bulb" color="#949494" size={50}/>
        <View style={{ width:'100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Text style={{ color:'#646464', fontSize: 15 }}>Equipe app Insight</Text>
          <View style={{ marginRight: 15, flexDirection: 'row', width: '25%', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={() => navigation.navigate('Editar')}>
              <Ion name="ios-build" color="#949494" size={50}/>
            </TouchableOpacity>
            <TouchableOpacity>
              <Ion name="md-trash" color="#949494" size={50}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
		</View>
  );
}