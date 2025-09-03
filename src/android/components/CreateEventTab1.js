import { StyleSheet, View, Text, TouchableOpacity, TextInput } from "react-native";
import Checkbox from 'expo-checkbox';
import { useState, useEffect } from "react";
import RNCalendarEvents from 'react-native-calendar-events';
import * as Calendar from 'expo-calendar';
import * as Permissions from 'expo-permissions';


export default function EventTab1(){

    const [isChecked, setChecked] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao]= useState("");
    const [endereco, setEndereco]=useState("");
    const [dataInicio, setDataInicio]=useState("");
    const [dataTermino, setDataTermino]=useState("");
    const [eventId, setEventId]=useState(null);

    const handlePostRequest = async () => {
    try {
      const response = await fetch('http://atendimento.caed.ufmg.br:8000/timeup2025/createevent.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Important for JSON payload
        },
        body: new URLSearchParams({
          codCalendar: {eventId},
          tituloEvento: {tituloEvento},
          descricaoEvento: {descricaoEvento},
          

          
        }).toString(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResponseData(data);
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

    async function createCalendarEvent() {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync();
        const defaultCalendar = calendars[0].id;

        const codEvent = await Calendar.createEventAsync(defaultCalendar, {
          title: 'Meeting with team',
          startDate: new Date('2025-09-03T15:00:00'),
          endDate: new Date('2025-09-03T16:00:00'),
          location: 'Zoom',
          notes: 'Discuss project updates',
          timeZone: 'America/Sao_Paulo', // timezone here
        });

        console.log('Event created with ID:', codEvent);
        return codEvent;
      }
    }


return(
    <View style={styles.container}>
        <View style={styles.questionNoImage}>
            <Text style={styles.labelText}>Título</Text>
            <TextInput value={titulo} onChangeText={setTitulo} style={styles.textInput}></TextInput>
        </View>
        <View style={styles.questionNoImage}>
            <Text style={styles.labelText}>Descrição</Text>
            <TextInput value={descricao} onChangeText={setDescricao} style={styles.textInput}></TextInput>
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
            <TextInput value={endereco} onChangeText={setEndereco} style={styles.textInput}></TextInput>
        </View>
        <View style={styles.questionNoImage}>
            <Text style={styles.labelText}>Data de Início</Text>
            <TextInput value={dataInicio} onChangeText={setDataInicio} style={styles.textInput}></TextInput>
        </View>
        <View style={styles.questionNoImage}>
            <Text style={styles.labelText}>Data de Término</Text>
            <TextInput value={dataTermino} onChangeText={setDataTermino} style={styles.textInput}></TextInput>
        </View>
        <View style={styles.centerView}>
            <TouchableOpacity style={styles.button} onPress={()=> {createCalendarEvent()}}>
                <Text style={styles.buttonText}>Criar Evento</Text>
            </TouchableOpacity>
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
    borderBottomWidth:1,
    color:'black',
    fontSize:18
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
  }
});