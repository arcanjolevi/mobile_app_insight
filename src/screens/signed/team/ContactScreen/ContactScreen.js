import * as React from 'react';
import { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import api from '../../../../services/api';

import AuthContext from '../../../../contexts/Auth';

import style from './style';

export default function ContactScreen({ navigation , route }){

  const { user , token } = useContext(AuthContext);

  const [ tema, setTema ] = useState('');
  const [ message, setMessage ] = useState('');
  const [ loading, setLoading ] = useState(false);

  const { member } = route.params;
  const { name, _id, email } = member;

  async function contact(){
    setLoading(true);
    try {
      await api.post('contact', {
          toEmail: email,
          toName: name,
          fromEmail: user.email,
          fromName: user.name,
          message,
          theme: tema
        }, { 
        headers: {
            token: token
        }
      });
    } catch (e) {
      console.log(e);
    }
    setLoading(false)
    navigation.goBack();
  }

  if(loading)
		return(
			<View style={{ marginTop: 20 }}>
				<ActivityIndicator color='#FCDE0F' size={40}/>
			</View>
		);

  return(
    <View style={style.container} >
      <View style={style.form}>
        <Text style={style.titleInputText}>
          Para:
        </Text>
        <Text style={style.destinyText}>
          {name}
        </Text>

        <Text style={style.titleInputText}>
          Tema:
        </Text>
        <TextInput onChangeText={t => setTema(t)} style={style.formInputText} />

        <Text style={style.titleInputText}>
          Mensagem:
        </Text>
        <TextInput 
          onChangeText={t => setMessage(t)}
          textAlignVertical='top'
          multiline={true}
          style={style.formInputMessage}
        />

        <TouchableOpacity 
          style={style.btnContact}
          onPress={contact}
        >
          <Text style={style.btnContactText}>
            Entrar em contato
          </Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
}