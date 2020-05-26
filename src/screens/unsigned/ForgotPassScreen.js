import * as React from 'react';
import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';
import LoadingScreen from '../LoadingScreen';
import api from '../../services/api';

export default function ForgotPassScreen({ navigation }) {
    const [ email, setEmail ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);

    async function recovery(){
        setIsLoading(true);
        if(email.length == 0 || !email.includes('.com') || !email.includes('@')){
            setIsLoading(false);
            alert("Email inválido");
        }else{
            
            try {
                const response = await api.post('forgot/password', { email: email });    
                console.log(response.data);
                setIsLoading(false);
                if(response.data.status && response.data.status == 'failed'){
                    alert('Usuario não encontrado');
                }else{
                    navigation.navigate('Recovery');
                }
            } catch (e) {
                setIsLoading(false);
                alert('Nao foi possivel connectar ou o usuário não existe.');
                console.log('Erro ao tentar recuperar senha', e);
            }
        }
    }


    if(isLoading)
        return ( <LoadingScreen />);

    return (
        <View style={ style.mainView }>
            <Ion name="md-refresh-circle" color="#949494" size={150}/>
            <Text style={ style.pageTitle }>Recuperar senha</Text>
            <View style={ style.descriptionView }>
                <Text style={ style.decriptionText }>
                    Digite o seu email. Enviaremos um token para que você possa alterar sua senha.
                </Text>
            </View>        
            <TextInput onChangeText={ text => setEmail(text)} placeholder='Email' style={ style.textInput }/>
            <TouchableOpacity onPress={recovery} style={{ width: '75%', backgroundColor: '#4287f5', marginBottom: 10, borderRadius: 15, height: 60, justifyContent: 'center', alignContent: 'center'}}>
                <Text style={{ textAlign: 'center' , color: '#fff', fontWeight: 'bold'}}>Recuperar</Text>
            </TouchableOpacity>  
            <TouchableOpacity style={{ marginBottom: 5 }} onPress={ () => navigation.popToTop()}>
                <Text style={{ color: '#949494'}}>Fazer login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginBottom: 5 }} onPress={ () => navigation.navigate('Recovery')}>
                <Text style={{ color: '#949494'}}>Já tenho o token</Text>
            </TouchableOpacity>
        </View>
    );
}

const style = {
    mainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#fff' 
    },
    pageTitle: {
        fontSize: 30,
        color: '#949494',
        marginBottom: 20
    },
    descriptionView: {
        width: '75%',
        marginBottom: 15
    },
    decriptionText: {
        textAlign: 'center',
        color: '#949494'
    },
    textInput : { 
        marginBottom:10,
        paddingLeft: 10,
        height: 60,
        borderRadius: 15,
        width: '75%',
        backgroundColor: '#f4f4f4'
    },
}