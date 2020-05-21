import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
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

const styleTextInputMessage = {
	marginBottom: 10,
	height: 200,
	borderRadius: 15,
	width: '100%',
  backgroundColor: '#f4f4f4',
  padding: 10
  
}

export default function ModifyMessageScreen ({ navigation, route }){
	const { modifyMessage } = useContext(AdminContext);

	const { message } = route.params;

	const [ body, setBody ] = useState('');
	const [ title, setTitle ] = useState('');

	useEffect(() => {
		setBody(message.body);
		setTitle(message.title);
	}, []);
 

	function handleModification(){
		modifyMessage(message._id, title, body);
		navigation.goBack();
	}

  return(
    <View style={{ paddingLeft:20, paddingTop:20, flex: 1,  backgroundColor: '#fff' }}>
      <Text>Titulo:</Text>
			<View style={{ width: '95%', alignItems:'center'}}>
				<TextInput onChangeText={t => setTitle(t)} defaultValue={title} style={styleTextInput}></TextInput>
			</View>
			
			<Text>Mesagem:</Text>
			<View style={{ width: '95%', alignItems:'center'}}>
				<TextInput defaultValue={body} onChangeText={t => setBody(t)} textAlignVertical='top' multiline={true} style={styleTextInputMessage}></TextInput>
			</View>
      
			<View style={{ width: '95%', alignItems:'center'}}>
				<TouchableOpacity onPress={handleModification} style={{ marginTop:10, width: '100%', backgroundColor: '#4287f5', marginBottom: 10, borderRadius: 15, height: 60, justifyContent: 'center', alignContent: 'center'}}>
							<Text style={{ textAlign: 'center' , color: '#fff', fontWeight: 'bold'}}>Atualizar</Text>
				</TouchableOpacity>
			</View>
		
    </View>
  );
}