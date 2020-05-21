import { StyleSheet } from 'react-native';
const config = require('../../../../config/config.json');

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  form:{
    width: '95%',
    elevation: 3,
    backgroundColor: '#FFF',
    marginTop: 15,
    paddingLeft: 15,
    paddingTop: 10,
    paddingBottom: 10
  },
  formInputText: { 
    marginBottom:10,
    paddingLeft: 10,
    height: 60,
    borderRadius: 15,
    width: '95%',
    backgroundColor: '#f4f4f4'
  },
  formInputMessage: { 
    marginBottom: 15,
	  height: 200,
	  borderRadius: 15,
	  width: '100%',
    backgroundColor: '#f4f4f4',
    padding: 10,
  },
  destinyText:{
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