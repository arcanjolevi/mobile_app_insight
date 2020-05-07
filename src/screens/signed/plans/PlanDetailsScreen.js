import * as React from 'react';
import { useState } from 'react';
import { FlatList, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';

const config = require('../../../config/config.json');

export default function PlanDetailsScreen ({ route, navigation }){
    const { plan } = route.params;
    console.log(plan)
    return (
      <View style={{ backgroundColor: config.backgroungColor, paddingTop:10,  flex: 1, alignItems: 'center' }}>
           

            <View style={{ width: '95%', backgroundColor: "#FFF"}}>
              <View style={{ marginTop: 5, marginLeft: 15, marginBottom: 0,  width: '100%'}}>
              	<View style={{flexDirection: 'row'}}>
              		<Ion name="ios-bookmarks" color="#949494" size={30}/>
              		<Text style={{marginLeft: 5, color: '#848484', fontWeight: 'bold', fontSize: 20}}>{plan.title}</Text>
              	</View>
              	<Text style={{color: '#848484'}}>{plan.totalSteps} trechos</Text>
              </View>
              <View style={{ width: '100%', paddingLeft: 15, marginTop: 20 }}>
                <Text style={{ color: '#848484'}}>Descrição:</Text>
                <Text style={{ marginBottom: 5, fontSize: 25, color: '#848484'}}>{plan.description}</Text>
                <Text style={{ color: '#848484'}}>Passos:</Text>
              </View>
              
                <FlatList 
                  style={{ width: '95%'}}
                  data={plan.plan}
                  
                  keyExtractor={ item => String(item._id) }
                  renderItem= { ({ item }) => (
                    <View style={{ marginTop:15, flexDirection: 'row' , alignItems: 'center', paddingLeft: 10 }}>
                      <Ion name="ios-paper-plane" color="#949494" size={30}/>
                      <Text style={{ marginLeft: 10, color: "#949494", fontSize: 20 }}>{item.text}</Text>
                    </View>
                  )}
                />
              
            </View> 
          
      </View>
    );
}



function PlanObject () {
	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => setIsEnabled(previousState => !previousState);

	return (
		<View style={{alignItems: 'center', marginBottom: 10, width: '100%', height: 160, backgroundColor: '#fff', elevation: 1}}>
        	<View style={{marginTop: 5, marginLeft: 15, marginBottom: 0,  width: '100%'}}>
            	<View style={{flexDirection: 'row'}}>
            		<Ion name="ios-bookmarks" color="#949494" size={30}/>
            		<Text style={{marginLeft: 5, color: '#848484', fontWeight: 'bold', fontSize: 20}}>Plano trimestral</Text>
            	</View>
            	<Text style={{color: '#848484'}}>Equipe PTI</Text>
          </View>
          <Text style={{ marginBottom: 5, fontSize: 25, color: '#848484'}}>Bíblia em três meses</Text>
            
          
          
      	</View>
  	);
}


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
      flexDirection: 'row',
      paddingLeft: 20,
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