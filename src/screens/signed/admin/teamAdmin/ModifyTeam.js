import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity } from 'react-native';

import AdminContext from '../../../../contexts/Admin';

const styleTextInput = {
	marginBottom: 10,
	paddingLeft: 10,
	height: 60,
	borderRadius: 15,
	width: '100%',
	backgroundColor: '#f4f4f4'
}

export default function ModifyTeam ({ navigation, route }){
	const { team } = route.params;
	const { modifyTeam } = useContext(AdminContext);

	const [ name, setName ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ institution, setInstitution ] = useState('');
	
	function handleModification(){
		modifyTeam(team._id, name, description, institution);
		navigation.goBack();
	}


	useEffect(() => {
		setName(team.name);
		setDescription(team.description);
		setInstitution(team.institution);
	}, []);

  return(
    <View style={{ paddingLeft:20, paddingTop:20, flex: 1,  backgroundColor: '#fff' }}>
      <Text>Nome da equipe:</Text>
			<View style={{ width: '95%', alignItems:'center'}}>
				<TextInput onChangeText={ t => setName(t)} defaultValue={name} style={styleTextInput}></TextInput>
			</View>
			
			<Text>Local/Insituiçao:</Text>
			<View style={{ width: '95%', alignItems:'center'}}>
				<TextInput onChangeText={ t => setInstitution(t)} defaultValue={institution} style={styleTextInput}></TextInput>
			</View>

			<Text>Descricao:</Text>
			<View style={{ width: '95%', alignItems:'center'}}>
				<TextInput onChangeText={ t => setDescription(t)} defaultValue={description} style={styleTextInput}></TextInput>
			</View>
			<View style={{ width: '95%', alignItems:'center'}}>
				<TouchableOpacity onPress={handleModification} style={{ marginTop:10, width: '100%', backgroundColor: '#4287f5', marginBottom: 10, borderRadius: 15, height: 60, justifyContent: 'center', alignContent: 'center'}}>
							<Text style={{ textAlign: 'center' , color: '#fff', fontWeight: 'bold'}}>Salvar</Text>
				</TouchableOpacity>
			</View>
		
    </View>
  );
}