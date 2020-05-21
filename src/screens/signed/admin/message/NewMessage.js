import * as React from 'react';
import { useEffect, useState, useContext} from 'react';
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

export default function NewMessage ({ navigation }){
	const { postNewMessage } = useContext(AdminContext);

	const [ title , setTitle ] = useState('');
	const [ body, setBody ] = useState('');
	

	function handlerPost(){
		postNewMessage(title, body);
		navigation.goBack();
	}

  return(
    <View style={{ paddingLeft:20, paddingTop:20, flex: 1,  backgroundColor: '#fff' }}>
      <Text>Titulo:</Text>
			<View  style={{ width: '95%', alignItems:'center'}}>
				<TextInput onChangeText={ t => setTitle(t)} style={styleTextInput}></TextInput>
			</View>
			
			<Text>Mesagem:</Text>
			<View style={{ width: '95%', alignItems:'center'}}>
				<TextInput onChangeText={ t => setBody(t)} textAlignVertical='top' multiline={true} style={styleTextInputMessage}></TextInput>
			</View>      
      
			<View style={{ width: '95%', alignItems:'center'}}>
				<TouchableOpacity onPress={handlerPost} style={{ marginTop:10, width: '100%', backgroundColor: '#4287f5', marginBottom: 10, borderRadius: 15, height: 60, justifyContent: 'center', alignContent: 'center'}}>
							<Text style={{ textAlign: 'center' , color: '#fff', fontWeight: 'bold'}}>Postar</Text>
				</TouchableOpacity>
			</View>
		
    </View>
  );
}