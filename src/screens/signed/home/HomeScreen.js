import * as React from 'react';
import { useState } from 'react';
import { Text, View, ScrollView, Button } from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';
const config = require('../../../config/config.json');


export default function HomeScreen() {
    const [value, setValue] = useState(0);

    function increment () {
        setValue(value+1);
    }

    return (
        <View style={{ backgroundColor: config.backgroungColor, flex: 1,  alignItems: 'center' }}>
            <View style={{paddingBottom: 10, marginTop: 10, paddingLeft: 10, alignItems: 'center', marginBottom: 10, width: '100%',  backgroundColor: '#fff', elevation: 1}}>
                <View style={{ marginTop: 15, marginLeft: 15, width:'100%'}}>
                    <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Bem vindo ao App Insight</Text>
                </View>
                <View style={{ padding: 10, width:'100%'}}>
                    <Text style={{ textAlign:'center', fontSize: 15 }}>Essa é a primeira versão do app Insight. Estamos ainda em fase de desenvolvimento e novas atualizações virão em breve. Que Deus te abençoe!!</Text>
                </View>
                <Ion name="ios-bulb" color="#949494" size={50}/>
                <View style={{  marginTop: 15, marginLeft: 15, width:'100%'}}>
                    <Text style={{ color:'#646464', fontSize: 15 }}>Equipe app Insight</Text>
                </View>
                
            </View>
            
        </View>
    );
}