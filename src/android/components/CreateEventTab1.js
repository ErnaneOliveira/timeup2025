import { Alert, Linking, Image, Button, Modal, StyleSheet, StatusBar, View, Text, TouchableOpacity, TextInput } from "react-native";
import Checkbox from 'expo-checkbox';
import {useContext, useState, useEffect } from "react";
import RNCalendarEvents from 'react-native-calendar-events';
import {Calendar} from 'react-native-calendars';
import * as Permissions from 'expo-permissions';
import { AppContext } from "./AppContext";
import { Dropdown } from 'react-native-element-dropdown';

export default function EventTab1({navigation}){

    const { event, setEvent, updateEventField} = useContext(AppContext);
    

    // Helper: update one field only
  const updateEvent = (field, value) => {
    setEvent(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const [val, setVal] = useState(null);

    const categorias = [ 
    {value: "11", label: "Consulta" }, 
    { value: "8", label: "Edição" }, 
    { value: "5", label: "Etapa do projeto" }, 
    { value: "1", label: "Evento" }, 
    { value: "3", label: "Gravação" }, 
    { value: "10", label: "Live" }, 
    { value: "6", label: "Microfundamento" }, 
    { value: "2", label: "Prova" }, 
    { value: "4", label: "Reserva de Estúdio" }, 
    { value: "9", label: "Reunião" }, 
    { value: "7", label: "Tarefa" } ];

    const [isChecked, setChecked] = useState(false);
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao]= useState("");
    const [endereco, setEndereco]=useState("");
    const [dataInicio, setDataInicio]=useState("");
    const [dataTermino, setDataTermino]=useState("");
    const [eventId, setEventId]=useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [calendarInput, setCalendarInput] = useState("");

    const fullDate = "2025-09-03 16:00:00";
    const initialDate = fullDate.split(" ")[0];

    console.log("Object keys: ", Object.keys(event));

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
      navigation.replace('Agenda');
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

        handlePostRequest2(codEvent);
        

        return codEvent;
      }
    }

 useEffect(() => {

    //updateEventField('titulo','New title');
    console.log("event.titulo", event.titulo);

    
  }, []);

  const setValue=(val)=>{

    if(calendarInput==='dataInicio'){

      updateEvent("dataInicio", val + " 08:00:00");

    }
    else{

      updateEvent("dataTermino", val + " 17:00:00");

    }
  }

   const openMaps = async () => {
      const location = event.endereco; // your string
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
    

return(
    <View style={styles.container}>
      <StatusBar 
                backgroundColor="#2a69b9" // Android only
                barStyle="light-content"   // "dark-content" for dark text/icons
              />

        <View style={styles.questionNoImage}>
                    <Text style={styles.labelText}>Categoria</Text>
                <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        data={categorias}
                        maxHeight={200}
                        labelField="label"
                        valueField="value"
                        placeholder="Escolhe a categoria"
                        value={val}
                        onChange={(item) => {
                          setVal(item.value);
                          console.log("Selected:", item);
                        }}
                      />
                </View>
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
            <View style={{flexDirection:'row'}}>
                <TextInput onChangeText={(text) => updateEvent("endereco", text)} style={[styles.textInput, {width:300}]}>{event.endereco}</TextInput>
                <TouchableOpacity onPress={openMaps}>
                    <Image style={styles.logo} source={require('../assets/location.png')}></Image>
                </TouchableOpacity>
                          
                </View>
            </View>
        <View style={styles.questionNoImage}>
            <Text style={styles.labelText}>Data de Início</Text>
            <View style={{flexDirection:'row'}}>
              <TextInput value={event.dataInicio} onChangeText={(text) => updateEvent("dataInicio", text)} style={[styles.textInput, {width:300}]}></TextInput>
              <TouchableOpacity onPress={() => {setModalVisible(true); setCalendarInput("dataInicio")}}>
                    <Image style={styles.logo} source={require('../assets/agendaicone.png')}></Image>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.questionNoImage}>
            <Text style={styles.labelText}>Data de Término</Text>
            <View style={{flexDirection:'row'}}>
                <TextInput value={event.dataTermino} onChangeText={(text) => updateEvent("dataTermino", text)} style={[styles.textInput, {width:300}]}></TextInput>
                <TouchableOpacity onPress={() => {setModalVisible(true); setCalendarInput("dataTermino")}}>
                    <Image style={styles.logo} source={require('../assets/agendaicone.png')}></Image>
                </TouchableOpacity>
            </View>

        </View>
        <View style={styles.centerView}>
            <TouchableOpacity style={styles.button} onPress={createCalendarEvent}>
                <Text style={styles.buttonText}>Criar Evento</Text>
            </TouchableOpacity>
        </View>

        <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Calendar
            current={initialDate}
              initialDate={initialDate}
              onDayPress={(day) => {

                setValue(day.dateString);

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
  dropdown: {
      height: 50,
      width:360,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
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
    marginBottom:2
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
  },
  logo:{
     width:40,
     height:40,
     resizeMode:'contain'
  }
});