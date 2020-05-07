import * as React from 'react';
import { useState } from 'react';
import { FlatList, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';
const config = require('../../../../config/config.json');

const style = {
  titleDescription: {
    color: '#848484',
    fontSize: 15
  },
  data: {
    fontSize:20,
    marginBottom: 10
  }
}


export default function PlanDetailsScreen ({ navigation }){
    
    return (
      <View style={{ backgroundColor: config.backgroungColor, paddingTop:10,  flex: 1, alignItems: 'center' }}>
          <View style={{ paddingBottom:10, paddingTop:10, paddingLeft: 15,  width: '95%', backgroundColor: '#FFF', elevation: 3}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={style.titleDescription}>Nome da equipe:</Text>
                <Text style={style.data}>Insight PTI</Text>
              </View>
              <View>
                
              </View>
              <TouchableOpacity onPress={ () => navigation.navigate('Alterar')}>
                <Ion  style={{ marginRight: 10 }} name="md-create" size={40}/>
              </TouchableOpacity>
            </View>
            
            <Text style={style.titleDescription}>Local:</Text>
            <Text style={style.data}>Parque Tecnologico Itaipu</Text>
            <Text style={style.titleDescription}>Descricao:</Text>
            <Text style={style.data}>Reunioes no lugar tal toda quarta 12h</Text>
            <Text style={style.titleDescription}>Integrantes:</Text>
          </View>
          <FlatList 
      	style={{ width: '95%', backgroundColor: '#fff', elevation: 3 }}
        data={[1, 2, 3, 4, 5, 6, 7]}
        showsVerticalScrollIndicator={false}
        keyExtractor={ item => String(item) }
        renderItem= { ({ item }) => (
					<View>
						<View							
							style={{ 
								paddingRight: 20,
								alignItems: 'center',
								flexDirection: 'row',
								paddingLeft: 10,
								justifyContent: 'space-between',
								height: 60,
								borderBottomColor: '#d4d4d4',
								borderBottomWidth: 1 
							}}
						>
              <View style={{ flexDirection: 'row', alignItems:'center'}}>
                <Ion name='md-person' color="#646464" size={45}/>
							  <Text style={{ marginLeft: 10, fontSize: 20, color: '#646464'}}>Integrante {item}</Text>
              </View>
              
              <TouchableOpacity>
                  <Ion name='md-trash' color="#646464" size={30}/>
                </TouchableOpacity>
            </View>
					</View> 
        )}
      />
      <View style={{ elevation: 1, marginBottom: 15, flexDirection: 'row', justifyContent:'space-between', marginTop: 15, height:60, alignItems: 'center', width: '95%', backgroundColor: '#fff'}}>
      	<Text style={{marginLeft: 10, fontWeight: 'bold', fontSize: 20 }}>Adicionar integrante</Text>
				<TouchableOpacity style={{ marginRight: 15}} onPress={ () => navigation.navigate('Add Integrante')}>
        	<Ion name="ios-add-circle-outline" size={50}/>
        </TouchableOpacity>
      </View>
      </View>
    );
}


