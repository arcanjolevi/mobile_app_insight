import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';
import style from './style';

const config = require('../../../../config/config.json');

export default function PersonalDetailsScreen ({ navigation, route }) {
  const { member } = route.params;

  const { name, institution, course } = member;

  return (
    <View style={style.container}>
     <View style={style.integrantDetails}>
        <Text style={style.contentTitleText}>
          Nome
        </Text>
        <Text style={style.contentText}>
          {name}
        </Text>

        <Text style={style.contentTitleText}>
          Local/Instituição
        </Text>
        <Text style={style.contentText}>
          {institution}
        </Text>

        <Text style={style.contentTitleText}>
          Curso
        </Text>
        <Text style={style.contentText}>
          {course}
        </Text>

        <TouchableOpacity 
          style={style.btnContact}
          onPress={ () => navigation.navigate('Contato', { member })}
        >
          <Text style={style.btnContactText}>
            Entrar em contato
          </Text>
          <Ion name='md-chatbubbles' color={config.btn1TextColor} size={30}/>
        </TouchableOpacity>

      </View>
      
    </View>
  );
}