import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { ActivityIndicator, Alert, FlatList, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';
import { AsyncStorage } from 'react-native';;
import api from '../../../services/api';

import PraysContext from '../../../contexts/Prays';

const config = require('../../../config/config.json');

export default function AllPrayersScreen ({ route, navigation }){
	
	const [ praysToShow, setPraystoShow ] = useState([]);
const { loading, downloadPrays, allPrays, userPrays, updatePrays } = useContext(PraysContext);

	useEffect(() => {
		downloadPrays();
	}, []);

	useEffect(() => {
			updatePraysToShow();
	}, [userPrays, allPrays]);

	function updatePraysToShow(){
		var v = [];
		allPrays.forEach( a => {
			var flag = false;
			userPrays.forEach(u => {
				if(a._id == u)
					flag = true; 
			});
			var aux = a;
			aux.participating = flag;
			v.push(aux);
		});
		setPraystoShow(v);
	}

  function participatingStyleDefiner(item){
    if(item.participating){
      return { width: '50%', backgroundColor: '#FCDE0F', marginBottom: 10, borderRadius: 15, height: 40, justifyContent: 'center', alignContent: 'center'};
    }else{
    	return { width: '50%', backgroundColor: '#c4c4c4', marginBottom: 10, borderRadius: 15, height: 40, justifyContent: 'center', alignContent: 'center'};
    }
  }

  function participatingTextDefine(item){
   	if(item.participating)
    	return "Participando";
    else
        return "Participar";
  }

  function updateParticipating(item){
		var v = [];
		
    praysToShow.forEach( x => {
    	var w = x;
      if(x._id == item._id)
      	w.participating = !x.participating;
        v.push(w);            
    });
    setPraystoShow(v);
  }

  function verifyRemoveParticipating(item){
  	if(item.participating){
    	Alert.alert(
      	"Cuidado",
        "Tem certeza que deseja abandonar esse plano?",
        [
        	{
          	text: "Cancelar",
            style: "cancel"
          },
					{ 
						text: "Sim", onPress: () => updateParticipating(item)
					}
        ]
			);
    }else{
      updateParticipating(item);
    }
  }

  async function updateAndGoBack(){
    var v = [];
    praysToShow.forEach( p => {
      if(p.participating)
        v.push(p._id);
    });
    updatePrays(v);
    navigation.popToTop();
  }


	if(loading)
		return(
			<View style={{ marginTop: 20 }}>
				<ActivityIndicator color='#FCDE0F' size={40}/>
			</View>
		);

  return (
    <View style={{ backgroundColor: config.backgroungColor, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    	<TouchableOpacity style={style.headerView} onPress={ () => updateAndGoBack()}>
      <Text style={{ fontSize: 20,  marginRight: 5, color: '#545454'}}>Salvar</Text>
							<Ion name="md-color-wand" color="#949494" size={30}/> 
      </TouchableOpacity>
      <FlatList 
      	style={{ width: '95%'}}
        data={praysToShow}
        showsVerticalScrollIndicator={false}
        keyExtractor={ item => String(item._id) }
        renderItem= { ({ item }) => (
        	<View style={{alignItems: 'center', marginBottom: 10, width: '100%', height: 150, backgroundColor: '#fff', elevation: 1}}>
          	<View style={{marginTop: 5, marginLeft: 15, marginBottom: 0,  width: '100%'}}>
            	<View style={{flexDirection: 'row'}}>
              	<Ion name="ios-bonfire" color="#949494" size={30}/>
                <Text style={{marginLeft: 5, color: '#848484', fontWeight: 'bold', fontSize: 20}}>{item.title}</Text>
              </View>
              <Text style={{color: '#848484'}}>{item.team}</Text>
            </View>
            <Text style={{ marginBottom: 5, fontSize: 25, color: '#848484'}}>{item.description}</Text>
						<TouchableOpacity onPress={() => verifyRemoveParticipating(item)} style={participatingStyleDefiner(item)}>
            	<Text style={{ textAlign: 'center' , color: '#747474', fontWeight: 'bold'}}>{participatingTextDefine(item)}</Text>
            </TouchableOpacity> 
          </View>
        )}
      />
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
        marginBottom: 15,
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