import { Button, Modal, Linking, Alert, Image, StatusBar, StyleSheet, View, Text, TouchableOpacity, TextInput } from "react-native";
import Checkbox from 'expo-checkbox';
import {useContext, useState, useEffect } from "react";
import RNCalendarEvents from 'react-native-calendar-events';
import * as Permissions from 'expo-permissions';
import { AppContext } from "./AppContext";
import { Calendar as CalendarView } from "react-native-calendars";
import LargeButton from "./LargeButton";
import * as Calendar from 'expo-calendar';

export default function ViewEventTab1({route, navigation}){

    const { event, setEvent, updateEventField} = useContext(AppContext);
    const [responseData, setResponseData] = useState(null);
    const codEvento = route.params.codEvento;



    console.log("codEvento: ", codEvento);

    // Helper: update one field only
  const updateEvent = (field, value) => {
    setEvent(prev => ({
      ...prev,
      [field]: value,
    }));
  };


    const [isChecked, setChecked] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

    
    const openMaps = async () => {
    const location = "Praça da Liberdade, Belo Horizonte"; // your string
    const appUrl = `comgooglemaps://?q=${encodeURIComponent(location)}`;
    const webUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;

    try {
      const supported = await Linking.canOpenURL(appUrl);
      if (supported) {
        await Linking.openURL(appUrl); // opens directly in Google Maps app
      } else {
        await Linking.openURL(webUrl); // fallback to browser
      }
    } catch (err) {
      Alert.alert("Error", "Unable to open Google Maps");
    }
  };
    const fullDate = "2025-09-03 16:00:00";
   const initialDate = fullDate.split(" ")[0];
   

    useEffect(() => {

    const handlePostRequest2 = async () => {
    try {
      const response = await fetch("http://atendimento.caed.ufmg.br:8000/timeup2025/geteventbyid.php?codCalendar="+codEvento);
      const text = await response.text();

      const data = JSON.parse(text);
      setResponseData(data);
      //console.log(data);

        updateEvent('codEvento', codEvento);
        updateEvent('codCalendar', data[0].codCalendar);
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

  const confirmDelete=()=>{

    Alert.alert(
      "Confirmar ação",
      "Deseja excluir o item do calendário?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel pressed"),
          style: "cancel", // iOS: bolds this option
        },
        {
          text: "OK",
          onPress: () => deletarEvento(),
        },
      ],
      { cancelable: true } // if true, tapping outside dismisses alert
    );

  }

  async function deleteCalendarEvent(eventId) {
  try {
    // Request permission first
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status !== "granted") {
      console.log("Calendar permission not granted");
      return;
    }

    // Delete event
    await Calendar.deleteEventAsync(eventId, {
      futureEvents: false, // if true, deletes this + all following recurring events
      instanceStartDate: undefined, // optional: needed if you only want a single instance of a recurring event
    });

    console.log("Event deleted:", eventId);
  } catch (error) {
    console.error("Error deleting event:", error);
  }
}

  const deletarEvento = async () => {
        try {
            
            console.log("Sending request...");

            const response = await fetch("http://atendimento.caed.ufmg.br:8000/timeup2025/deletarevento.php?codEvento="+codEvento);
            
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

            deleteCalendarEvent(event.codCalendar);
            Alert.alert("Ação confirmada","Evento deletado com sucesso");

            navigation.replace('Agenda');
};
        

return(
    <View style={styles.container}>
      <StatusBar 
                backgroundColor="#2a69b9" // Android only
                barStyle="light-content"   // "dark-content" for dark text/icons
              /> 
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
              <TouchableOpacity onPress={openMaps}>
                <Image style={styles.logo} source={require('../assets/location.png')}></Image>
              </TouchableOpacity>
              
            </View>
            
        </View>
        <View style={styles.questionNoImage}>
            <Text style={styles.labelText}>Data de Início</Text>
            <View style={{flexDirection:'row'}}>
              <Text style={[styles.textInput, {width:300}]}>{event.dataInicio}</Text>
              <TouchableOpacity onPress={() => {setModalVisible(true); setSelectedDate(event.dataInicio.split(" ")[0])}}>
                <Image style={styles.logo} source={require('../assets/agendaicone.png')}></Image>
              </TouchableOpacity>
            </View>
        </View>
        <View style={styles.questionNoImage}>
            <Text style={styles.labelText}>Data de Término</Text>
            <View style={{flexDirection:'row'}}>
              <Text style={[styles.textInput, {width:300}]}>{event.dataTermino}</Text>
              <TouchableOpacity onPress={() => {setModalVisible(true); setSelectedDate(event.dataTermino.split(" ")[0])}}>
                <Image style={styles.logo} source={require('../assets/agendaicone.png')}></Image>
              </TouchableOpacity>
            </View>
            
        </View>
        <LargeButton buttonText={'Editar'} action={navigation.navigate} params={{url: 'Editar', cod:event.codEvento }}/>
        <LargeButton buttonText={'Deletar'} action={confirmDelete} params={event.codCalendar} color={'red'}/>



        <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <CalendarView
            current={initialDate}
              initialDate={initialDate}
              onDayPress={(day) => {

                setModalVisible(false);
              }}
              markedDates={{
                [selectedDate]: { selected: true, selectedColor: "blue" },
              }}
            />
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
);

}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    width: "90%",
    elevation: 5,
  },
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