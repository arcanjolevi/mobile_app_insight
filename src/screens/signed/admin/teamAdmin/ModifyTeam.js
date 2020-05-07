import * as React from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';

const styleTextInput = {
	marginBottom: 10,
	paddingLeft: 10,
	height: 60,
	borderRadius: 15,
	width: '100%',
	backgroundColor: '#f4f4f4'
}

export default function ModifyTeam ({ navigation }){
  return(
    <View style={{ paddingLeft:20, paddingTop:20, flex: 1,  backgroundColor: '#fff' }}>
      <Text>Nome da equipe:</Text>
			<View style={{ width: '95%', alignItems:'center'}}>
				<TextInput style={styleTextInput}></TextInput>
			</View>
			
			<Text>Local/Insituiçao:</Text>
			<View style={{ width: '95%', alignItems:'center'}}>
				<TextInput style={styleTextInput}></TextInput>
			</View>

			<Text>Descricao:</Text>
			<View style={{ width: '95%', alignItems:'center'}}>
				<TextInput style={styleTextInput}></TextInput>
			</View>
			<View style={{ width: '95%', alignItems:'center'}}>
				<TouchableOpacity style={{ marginTop:10, width: '100%', backgroundColor: '#4287f5', marginBottom: 10, borderRadius: 15, height: 60, justifyContent: 'center', alignContent: 'center'}}>
							<Text style={{ textAlign: 'center' , color: '#fff', fontWeight: 'bold'}}>Registrar</Text>
				</TouchableOpacity>
			</View>
		
    </View>
  );
}