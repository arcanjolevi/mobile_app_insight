import * as React from 'react';
import { FlatList, View, TextInput, Text, TouchableOpacity } from 'react-native';
import Ion from 'react-native-vector-icons/Ionicons';

const styleTextInput = {
	marginBottom: 10,
	paddingLeft: 10,
	height: 60,
	borderRadius: 15,
	width: '100%',
	backgroundColor: '#f4f4f4'
}

export default function AddMembers ({ navigation }){
  return(
    <View style={{ paddingLeft:20, paddingTop:20, flex: 1,  backgroundColor: '#fff' }}>
			<FlatList 
      	style={{ width: '95%'}}
        data={[1, 2, 3, 4, 5, 6, 7]}
        showsVerticalScrollIndicator={false}
        keyExtractor={ item => String(item) }
        renderItem= { ({ item }) => (
					<View style={{ backgroundColor: '#FFF'}}>
						<TouchableOpacity 
							onPress={ () => navigation.goBack()}
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
              
              
						</TouchableOpacity>
					</View> 
        )}
      />
    </View>
  );
}