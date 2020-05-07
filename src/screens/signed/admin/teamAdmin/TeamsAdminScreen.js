import * as React from 'react';
import { Image, View, TouchableOpacity, Text, ScrollView, FlatList } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'
import Ion from 'react-native-vector-icons/Ionicons';
const config = require('../../../../config/config.json');
function ConfigObject ({title, iconName , navigation, action }) {
	
	return (
		<TouchableOpacity 
			onPress={ action }
			style={{ 
				paddingRight: 20,
				alignItems: 'center',
				flexDirection: 'row',
				paddingLeft: 10,
				justifyContent: 'flex-start',
				height: 60,
				borderBottomColor: '#d4d4d4',
				borderBottomWidth: 1 
			}}
		>
			<Ion name={iconName} color="#646464" size={45}/>
			<Text style={{ marginLeft: 10, fontSize: 20, color: '#646464'}}>{title}</Text>
		</TouchableOpacity>
	);
}

export default function TeamsAdminSreen ({ navigation }) {
  return(
    <View style={{ backgroundColor: config.backgroungColor, flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>			
			<View style={{ elevation: 5, marginBottom: 15, flexDirection: 'row', justifyContent:'space-between', marginTop: 15, height:60, alignItems: 'center', width: '95%', backgroundColor: '#fff'}}>
      	<Text style={{marginLeft: 10, fontWeight: 'bold', fontSize: 20 }}>Adicionar Equipe</Text>
				<TouchableOpacity style={{ marginRight: 15}} onPress={ () => navigation.navigate('Add Equipe')}>
        	<Ion name="ios-add-circle-outline" size={50}/>
        </TouchableOpacity>
      </View>
			<FlatList 
      	style={{ width: '95%'}}
        data={[1, 2, 3, 4, 5, 6, 7]}
        showsVerticalScrollIndicator={false}
        keyExtractor={ item => String(item) }
        renderItem= { ({ item }) => (
					<View style={{ backgroundColor: '#FFF'}}>
						<TouchableOpacity 
							onPress={ () => navigation.navigate('Manutencao')}
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
							<Ion name='ios-people' color="#646464" size={45}/>
							<Text style={{ marginLeft: 10, fontSize: 20, color: '#646464'}}>Equipe {item}</Text>
              </View>
              
              <TouchableOpacity>
                  <Ion name='md-trash' color="#646464" size={35}/>
                </TouchableOpacity>
						</TouchableOpacity>
					</View> 
        )}
      />
    </View>
  );
}

/*<ScrollView showsVerticalScrollIndicator={false} style={{ width: '95%'}}>
				<View style={{ marginBottom: 5, width: '100%', backgroundColor: '#fff', elevation: 3 }}>
					<ConfigObject 
						title={ 'Adicionar Equipe' }
						iconName={ 'md-contact' }
						navigation={ navigation } 
						action={ () => {} }
					/>
					<ConfigObject 
						title={ 'Todas as Equipes' } 
						iconName={ 'ios-people' } 
						navigation={ navigation } 
						action={ () => {} }
					/>
				</View>	
      </ScrollView>*/