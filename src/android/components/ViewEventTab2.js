import {Image, TextInput, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { AppContext } from "./AppContext";
import { useContext } from "react";

export default function ViewEventTab2({route, navigation}){

const { event, setEvent, updateEventField} = useContext(AppContext);
const updateEvent = (field, value) => {
    setEvent(prev => ({
      ...prev,
      [field]: value,
    }));
  };

return(
    <View style={styles.container}>
        <View style={styles.questionNoImage}>
            <Text style={styles.labelText}>Categoria</Text>
            <Text style={styles.textInput}>{event.codCategoria}</Text>
        </View>
        <View style={styles.questionNoImage}>
            <Text style={styles.labelText}>Link da tarefa</Text>
            <View style={{flexDirection:'row', justifyContent:'flex-end', alignItems:'flex-end'}}>
            <Text style={[styles.textInput, {width:300, }]}>{event.link}</Text>
            <Image style={styles.logo} source={require('../assets/link.png')}></Image>
            </View>
        </View>
        <View style={styles.questionNoImage}>
            <Text style={styles.labelText}>Anexar Arquivo</Text>
            <View style={{flexDirection:'row'}}>
            <Text style={[styles.textInput, {width:300, justifyContent:'flex-end', alignItems:'flex-end'}]}>{event.arquivo}</Text>
            <Image style={styles.logo} source={require('../assets/arquivo.png')}></Image>
            </View>
        </View>
        <View style={styles.questionNoImage}>
            <Text style={styles.labelText}>Nome Contato</Text>
            <Text style={styles.textInput}>{event.nomeContato}</Text>
        </View>
        <View style={styles.questionNoImage}>
            <Text style={styles.labelText}>Número</Text>
            <Text style={styles.textInput}>{event.numeroContato}</Text>
        </View>
        <View style={styles.questionNoImage}>
            <Text style={styles.labelText}>E-mail</Text>
            <Text style={styles.textInput}>{event.email}</Text>
        </View>
</View>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  questionNoImage:{
    alignItems:'flex-start',
    marginLeft:25,
    marginTop:15,
    marginBottom:10
  },
  labelText:{
    color:'black',
    fontSize:18
  },
  textInput:{
    width:350,
    fontWeight:'bold',
    color:'black',
    fontSize:18,
    borderBottomWidth:1,
  },
   checkbox: {
    alignSelf: 'center',
    marginRight:15
  },
  button:{
    backgroundColor:'blue',
    padding:15,
    width:350
  },
  buttonText:{
    color:'white',
    fontWeight:'bold',
    fontSize:18,
    textAlign:'center'
  },
  centerView:{
    flex:1,
    alignItems:'center',
    margin:25,
    marginTop:15
  },
  logo:{
     width:40,
     height:40,
     resizeMode:'contain'
  }
});