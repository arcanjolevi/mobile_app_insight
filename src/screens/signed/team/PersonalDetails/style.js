import { StyleSheet } from 'react-native';
const config = require('../../../../config/config.json');

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  integrantDetails:{
    width: '95%',
    backgroundColor: '#FFF',
    marginTop: 10,
    elevation: 3,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10
  },
  contentTitleText:{
    color: '#545454',
    fontSize: 15
  },
  contentText: {
    fontSize: 20,
    marginBottom: 10
  }, 
  btnContact: { 
    width: '95%',
    height: 50,
    backgroundColor: config.btn1Color,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },
  btnContactText: {
    marginRight: 5,
    color: config.btn1TextColor,
    fontWeight: 'bold'
  }
});