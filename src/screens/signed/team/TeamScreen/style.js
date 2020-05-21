import { StyleSheet } from 'react-native';


const style = StyleSheet.create({
  container: { 
    flex: 1,
    alignItems: 'center',
    marginTop: 10
  },
  flatList: { 
    width: '95%'
  },
  itemContainer: { 
    backgroundColor: '#FFF'
  },
  itemTouchableOpacity: { 
    paddingRight: 20,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    justifyContent: 'space-between',
    height: 60,
    borderBottomColor: '#d4d4d4',
    borderBottomWidth: 1 
  },
  iconAndTextContainer: { 
    flexDirection: 'row', 
    alignItems:'center'
  },
  teamText: { 
    marginLeft: 10,
    fontSize: 20,
    color: '#646464'
  }
});


export default style;