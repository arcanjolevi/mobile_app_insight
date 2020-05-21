import { StyleSheet } from 'react-native';
const config = require('../../../../config/config.json');

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  teamDetails:{
    width: '95%',
    backgroundColor: '#FFF',
    marginTop: 10,
    elevation: 3,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 20,
    paddingRight: 15
  },
  contentTitleText:{
    color: '#545454',
    fontSize: 15
  },
  contentText: {
    fontSize: 17,
    marginBottom: 10
  },
  flatList: { marginTop: 15,
    width: '95%',
    backgroundColor: '#fff',
    elevation: 3
  },
  itemContainer: { 
    paddingRight: 20,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    justifyContent: 'space-between',
    height: 60,
    borderBottomColor: '#d4d4d4',
    borderBottomWidth: 1 
  },
  itemTitleContainer: {
    flexDirection: 'row',
    alignItems:'center'
  },
  itemTitleText: { 
    marginLeft: 10,
    fontSize: 15,
    color: '#646464'
  }
});