import * as React from 'react';
import { useState } from 'react';
import { Alert, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';
import api from '../../services/api';
import LoadingScreen from '../LoadingScreen';

export default function RecoveryPassScreen({ navigation }) {
    const [ token, setToken ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);

    async function changePass(){

        if(token.length < 20 || password.length == 0){        
            alert("Dados inválidos");
        }else{
            setIsLoading(true);
            try {
                const response = await api.post('update/password', {
                    token: token,
                    password: password
                });
                setIsLoading(false);
                if(response.data.status != 'failed'){
                    Alert.alert(
                        "Sucesso",
                        "Senha Atualizada",
                        [
                          {
                            text: "Cancelar",
                            style: "cancel"
                          },
                          { text: "Fazer Login", onPress: () => navigation.popToTop()}
                        ]
                    );
                }
            } catch (error) {
                setIsLoading(false);
                alert('Não foi possível Atualizar senha. Tente novamente.');
            }
        }

        
    }


    if(isLoading)
        return(
            <LoadingScreen />
        );

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#fff' }}>
            <Ion name="md-refresh-circle" color="#949494" size={150}/>
            <Text style={{ fontSize: 30, color: '#949494' , marginBottom: 20 }}>Recuperar senha</Text>
            <View style={{ width: '75%', marginBottom: 15}}>
                <Text style={{ textAlign: 'center', color: '#949494'}}>Enviamos um token no seu email. Copie e cole o token abaixo</Text>
            </View>
            <TextInput onChangeText={text => setToken(text)} placeholder='Token' style={{ marginBottom:10, paddingLeft: 10, height: 60, borderRadius: 15, width: '75%', backgroundColor: '#f4f4f4'}}/>
            <TextInput onChangeText={text => setPassword(text)} placeholder='Nova senha' secureTextEntry style={{ marginBottom: 10, paddingLeft: 10, height: 60, borderRadius: 15, width: '75%', backgroundColor: '#f4f4f4'}}/>
            <TouchableOpacity onPress={changePass} style={{ width: '75%', backgroundColor: '#4287f5', marginBottom: 10, borderRadius: 15, height: 60, justifyContent: 'center', alignContent: 'center'}}>
                <Text style={{ textAlign: 'center' , color: '#fff', fontWeight: 'bold'}}>Alterar senha</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginBottom: 5 }} onPress={ () => navigation.navigate('ForgotPassword')}>
                <Text style={{ color: '#949494'}}>Enviar token novamente</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginBottom: 5 }} onPress={ () => navigation.popToTop()}>
                <Text style={{ color: '#949494'}}>Fazer Login</Text>
            </TouchableOpacity>
        </View>
    );
  }