import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { ActivityIndicator, Alert, TextInput, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';;
import api from '../../../services/api';
import LoadingScreen from '../../LoadingScreen';

import AuthContext from '../../../contexts/Auth';
const config = require('../../../config/config.json');
export default function MyProfileScreen ({ navigation }){

    const { user , token } = useContext(AuthContext);

    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ institution, setInstituition ] = useState('');
    const [ whatsapp, setwhatsapp ] = useState('');
    const [ day , setDay ] = useState('');
    const [ month, setMonth ] = useState('');
    const [ year, setYear ] = useState('');
    const [ course, setCourse ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);

    async function init(){
        setName(user.name);
        setEmail(user.email);
        setInstituition(user.institution);
        setwhatsapp(user.whatsapp);
        const [ day, month, year ] = user.bornDate.split('/');
        setDay(day);
        setMonth(month);
        setYear(year);
        setCourse(user.course);
    }

    useEffect(() => {
        init();
    }, []);


    function alertCustom(text){
		Alert.alert( "Alerta!!", text );
	}

    function correctDate(){
		if(day.length == 1)
			setDay("0"+day);
		if(month.length == 1)
			setMonth("0"+month);
    }
    
    async function updateDataIntoServer(){
        setIsLoading(true);
        try{
            await api.post('update/personal/details',  {
                    name: name,
                    institution: institution,
                    whatsapp: whatsapp,
                    bornDate: `${day}/${month}/${year}`,
                    course
                }, { 
                    headers: {
                    token: token
                }
            });
            var obj = user;
            obj.name = name;
            obj.institution = institution;
            obj.whatsapp = whatsapp;
            obj.bornDate = `${day}/${month}/${year}`;
            await AsyncStorage.setItem('userData', JSON.stringify(obj));
            setIsLoading(false);
        }catch(e){
            console.log(e);
            setIsLoading(false);
            alert('Não foi possível atualizar. Tente novamente mais tarde.');
        }
    }

    function confirmUpdateData(){
        if(name.length < 2){
			alertCustom("Nome inválido");
			return ;
		}else if(institution.length < 2){
			alertCustom("Instituição de ensino inválida");
			return ;
		}else if(whatsapp.length < 8){
			alertCustom("whatsapp inválido");
			return ;
		}else if(day > 31 || day.length > 2 || month > 12 || month.length > 2 || year.length != 4){
			alertCustom("Data de nascimento inválida");
            return ;
        }else{//Dados válidos

            Alert.alert(
                "Cuidado",
                "Tem certeza que deseja alterar seus dados?",
                [
                  {
                    text: "Cancelar",
                    style: "cancel"
                  },
                  { text: "Sim", onPress: () => updateDataIntoServer()}
                ]
            );
            
        }
    }

    if(isLoading)
		return(
			<View style={{ marginTop: 20 }}>
				<ActivityIndicator color='#FCDE0F' size={40}/>
			</View>
		);

    return (
      <View style={{ backgroundColor: config.backgroungColor, flex: 1, alignItems: 'center' }}>
           
            <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}}>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{ marginTop: 10, backgroundColor: '#fff', width: '95%', justifyContent: 'center', alignItems:'center'}}>
                        <Text style={{ marginBottom: 20, marginTop: 10, fontSize: 25 , color: '#949494', fontWeight: 'bold'}} >Meus dados</Text>
                        <TextInput defaultValue={name} onChangeText={text => setName(text)} placeholder='Nome'  style={{ marginBottom:10, paddingLeft: 10, height: 60, borderRadius: 15, width: '75%', backgroundColor: '#f4f4f4'}}/>
                        <TextInput editable={false} defaultValue={email} onChangeText={text => setEmail(text)} placeholder='Email'  style={{ marginBottom:10, paddingLeft: 10, height: 60, borderRadius: 15, width: '75%', backgroundColor: '#f4f4f4'}}/>
                        <TextInput defaultValue={institution} onChangeText={ t => setInstituition(t)} placeholder='instituição'  style={{ marginBottom:10, paddingLeft: 10, height: 60, borderRadius: 15, width: '75%', backgroundColor: '#f4f4f4'}}/>
                        <TextInput defaultValue={whatsapp} onChangeText={t => setwhatsapp(t)} placeholder='whatsapp'  style={{ marginBottom:10, paddingLeft: 10, height: 60, borderRadius: 15, width: '75%', backgroundColor: '#f4f4f4'}}/>
                        <TextInput defaultValue={course} onChangeText={t => setCourse(t)} placeholder='Curso'  style={{ marginBottom:10, paddingLeft: 10, height: 60, borderRadius: 15, width: '75%', backgroundColor: '#f4f4f4'}}/>
                        <Text style={{marginBottom: 5, marginLeft: 15, color: '#949494'}}>Data de nascimento</Text>
                        <View style={{ width: '75%', flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between'}}>
				    		<TextInput defaultValue={day} onEndEditing={correctDate} onChangeText={t => setDay(t)} placeholder='dia' maxLength={2}   keyboardType={'numeric'} style={{width: '20%', backgroundColor: '#f4f4f4', borderRadius: 15, textAlign: 'center'}}></TextInput>
				    		<TextInput defaultValue={month} onEndEditing={correctDate} onChangeText={t => setMonth(t)} placeholder='mês' maxLength={2}  keyboardType={'numeric'} style={{width: '30%', backgroundColor: '#f4f4f4', borderRadius: 15, textAlign: 'center'}}></TextInput>
				    		<TextInput defaultValue={year} onChangeText={t => setYear(t)} placeholder='ano'  keyboardType={'numeric'} style={{width: '40%', backgroundColor: '#f4f4f4', borderRadius: 15, textAlign: 'center'}}></TextInput>
				        </View>
                        <TouchableOpacity onPress={confirmUpdateData}  style={{ width: '75%', backgroundColor: '#4287f5', marginBottom: 10, borderRadius: 15, height: 60, justifyContent: 'center', alignContent: 'center'}}>
				    		<Text style={{ textAlign: 'center' , color: '#fff', fontWeight: 'bold'}}>Salvar</Text>
				    	</TouchableOpacity>
                    </View>
                </View>
                <View style={{width: '100%', height: 300 }}></View>
            </ScrollView>
      </View>
    );
}


/*
<TextInput placeholder='Nome'  style={{ marginBottom:10, paddingLeft: 10, height: 60, borderRadius: 15, width: '75%', backgroundColor: '#f4f4f4'}}/>
                <TextInput placeholder='Email'  style={{ marginBottom:10, paddingLeft: 10, height: 60, borderRadius: 15, width: '75%', backgroundColor: '#f4f4f4'}}/>
                <TextInput placeholder='instituição'  style={{ marginBottom:10, paddingLeft: 10, height: 60, borderRadius: 15, width: '75%', backgroundColor: '#f4f4f4'}}/>
                <TextInput placeholder='whatsapp'  style={{ marginBottom:10, paddingLeft: 10, height: 60, borderRadius: 15, width: '75%', backgroundColor: '#f4f4f4'}}/>
                <View style={{ width: '75%', flexDirection: 'row', marginBottom: 10, justifyContent: 'space-between'}}>
						<TextInput placeholder='dia' maxLength={2}   keyboardType={'numeric'} style={{width: '20%', backgroundColor: '#f4f4f4', borderRadius: 15, textAlign: 'center'}}></TextInput>
						<TextInput placeholder='mês' maxLength={2}  keyboardType={'numeric'} style={{width: '30%', backgroundColor: '#f4f4f4', borderRadius: 15, textAlign: 'center'}}></TextInput>
						<TextInput placeholder='ano'  keyboardType={'numeric'} style={{width: '40%', backgroundColor: '#f4f4f4', borderRadius: 15, textAlign: 'center'}}></TextInput>
				</View>
*/


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