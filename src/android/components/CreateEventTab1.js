import { StyleSheet, View, Text, TouchableOpacity, TextInput } from "react-native";
import Checkbox from 'expo-checkbox';
import {useContext, useState, useEffect } from "react";
import RNCalendarEvents from 'react-native-calendar-events';
import * as Calendar from 'expo-calendar';
import * as Permissions from 'expo-permissions';
import { AppContext } from "./AppContext";

export default function EventTab1({navigation}){

    const { event, setEvent, updateEventField} = useContext(AppContext);

    // Helper: update one field only
  const updateEvent = (field, value) => {
    setEvent(prev => ({
      ...prev,
      [field]: value,
    }));
  };


    const [isChecked, setChecked] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao]= useState("");
    const [endereco, setEndereco]=useState("");
    const [dataInicio, setDataInicio]=useState("");
    const [dataTermino, setDataTermino]=useState("");
    const [eventId, setEventId]=useState(null);

    const handlePostRequest2 = async (cod) => {
  try {
    if (!event) {
      console.error("event object is undefined");
      return;
    }

    console.log("Sending request...");

    const response = await fetch(
      "http://atendimento.caed.ufmg.br:8000/timeup2025/createevent.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          codCalendar: cod,
          tituloEvento: event.titulo,
          descricaoEvento: event.descricao,
          prioridadeEvento: event.prioridade,
          locationEvento: event.endereco,
          dataInicioEvento: event.dataInicio,
          dataTerminoEvento: event.dataTermino,
          codCategoria: event.codCategoria,
          linkEvento: event.link,
          arquivoEvento: event.arquivo,
          nomeContatoEvento: event.nomeContato,
          numeroContatoEvento: event.numeroContato,
          emailEvento: event.email,
        }).toString(),
      }
    );

    const text = await response.text();
    console.log("Raw response:", text);

    // Try parse JSON if possible
    try {
      const data = JSON.parse(text);
      setResponseData(data);
    } catch {
      console.warn("Response is not valid JSON");
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

    const handlePostRequest = async (cod) => {
    try {
      const response = await fetch('http://atendimento.caed.ufmg.br:8000/timeup2025/createevent.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Important for JSON payload
        },
        body: new URLSearchParams({
          codCalendar: cod,
          tituloEvento: event.titulo,
          descricaoEvento: event.descricao,
          prioridadeEvento: event.prioridade,
          locationEvento: event.endereco,
          dataInicioEvento: event.dataInicio,
          dataTerminoEvento: event.dataTermino,
          codCategoria: event.codCategoria,
          linkEvento: event.link,
          arquivoEvento: event.arquivo,
          nomeContatoEvento: event.nomeContato,
          numeroContatoEvento: event.numeroContato,
          emailEvento: event.email
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
          title: event.titulo,
          startDate: new Date(event.dataInicio),
          endDate: new Date(event.dataTermino),
          location: event.endereco,
          notes: event.descricao,
          timeZone: 'America/Sao_Paulo', // timezone here
        });
        
        console.log("Event id: ", codEvent);

        updateEventField('codEvento', codEvent);


        console.log('Event codEvent after update: ', event.codEvento);

        handlePostRequest2(codEvent)

        return codEvent;
      }
    }

    
    const savedata=()=>{
        
          const newEvent = createCalendarEvent();

          updateEventField('codEvento', newEvent);
          console.log('Event codEvent after update: ', event.codEvento);
   
          handlePostRequest();


    } 

    const showData=()=>{
      
      console.log(event);

    }
 useEffect(() => {

    //updateEventField('titulo','New title');
    console.log("event.titulo", event.titulo);

    
  }, []);
    

return(
    <View style={styles.container}>
        <View style={styles.questionNoImage}>
            <Text style={styles.labelText}>Título</Text>
            <TextInput value={event.titulo} onChangeText={(text) => updateEvent("titulo", text)} style={styles.textInput}></TextInput>
        </View>
        <View style={styles.questionNoImage}>
            <Text style={styles.labelText}>Descrição</Text>
            <TextInput value={event.descricao} onChangeText={(text) => updateEvent("descricao", text)} style={styles.textInput}></TextInput>
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
            <TextInput value={event.endereco} onChangeText={(text) => updateEvent("endereco", text)} style={styles.textInput}></TextInput>
        </View>
        <View style={styles.questionNoImage}>
            <Text style={styles.labelText}>Data de Início</Text>
            <TextInput value={event.dataInicio} onChangeText={(text) => updateEvent("dataInicio", text)} style={styles.textInput}></TextInput>
        </View>
        <View style={styles.questionNoImage}>
            <Text style={styles.labelText}>Data de Término</Text>
            <TextInput value={event.dataTermino} onChangeText={(text) => updateEvent("dataTermino", text)} style={styles.textInput}></TextInput>
        </View>
        <View style={styles.centerView}>
            <TouchableOpacity style={styles.button} onPress={createCalendarEvent}>
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