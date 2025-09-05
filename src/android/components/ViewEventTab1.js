import { Image, StyleSheet, View, Text, TouchableOpacity, TextInput } from "react-native";
import Checkbox from 'expo-checkbox';
import {useContext, useState, useEffect } from "react";
import RNCalendarEvents from 'react-native-calendar-events';
import * as Calendar from 'expo-calendar';
import * as Permissions from 'expo-permissions';
import { AppContext } from "./AppContext";

export default function ViewEventTab1({route, navigation}){

    const { event, setEvent, updateEventField} = useContext(AppContext);
    const [responseData, setResponseData] = useState(null);

    // Helper: update one field only
  const updateEvent = (field, value) => {
    setEvent(prev => ({
      ...prev,
      [field]: value,
    }));
  };


    const [isChecked, setChecked] = useState(false);

    useEffect(() => {

    const handlePostRequest2 = async () => {
    try {
      const response = await fetch("http://atendimento.caed.ufmg.br:8000/timeup2025/geteventbyid.php?codCalendar=15");
      const text = await response.text();

      const data = JSON.parse(text);
      setResponseData(data);
      //console.log(data);

        updateEvent('titulo', data[0].tituloEvento);
        updateEvent('descricao', data[0].descricaoEvento);
        updateEvent('prioridade', data[0].prioridadeEvento);
        updateEvent('locationEvento', data[0].locationEvento);
        updateEvent('dataInicio', data[0].dataInicioEvento);
        updateEvent('dataTermino', data[0].dataTerminoEvento);
        updateEvent('codCategoria', data[0].codCategoria);
        updateEvent('link', data[0].linkEvento);
        updateEvent('arquivo', data[0].arquivoEvento);
        updateEvent('nomeContato', data[0].nomeContatoEvento);       
        updateEvent('numeroContato', data[0].numeroContatoEvento);
        updateEvent('email', data[0].emailEvento);
      // ... the rest
    } catch (err) {
      console.warn("Error fetching or parsing:", err);
    }
  };

    handlePostRequest2();
    
  }, []);
    

return(
    <View style={styles.container}>
        <View style={styles.questionNoImage}>
            <Text style={styles.labelText}>Título</Text>
            <Text style={styles.textInput}>{event.titulo}</Text>
        </View>
        <View style={styles.questionNoImage}>
            <Text style={styles.labelText}>Descrição</Text>
            <Text style={styles.textInput}>{event.descricao}</Text>
        </View>
        <View style={[styles.questionNoImage, {flexDirection:'row'}]}>
             <Checkbox
                style={styles.checkbox}
                value={isChecked}
                onValueChange={setChecked}
                color={isChecked ? '#4630EB' : undefined}
                />
            <Text style={styles.labelText}>Prioridade</Text>
        </View>
        <View style={styles.questionNoImage}>
            <Text style={styles.labelText}>Endereço</Text>
            <View style={{flexDirection:'row'}}>
              <Text style={[styles.textInput, {width:300}]}>{event.endereco}</Text>
              <Image style={styles.logo} source={require('../assets/location.png')}></Image>
            </View>
            
        </View>
        <View style={styles.questionNoImage}>
            <Text style={styles.labelText}>Data de Início</Text>
            <Text style={styles.textInput}>{event.dataInicio}</Text>
        </View>
        <View style={styles.questionNoImage}>
            <Text style={styles.labelText}>Data de Término</Text>
            <Text style={styles.textInput}>{event.dataTermino}</Text>
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