import { Alert, 
    Linking, 
    Image, 
    Button, 
    Modal, 
    StyleSheet, 
    StatusBar, 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput 
} from "react-native";
import Checkbox from 'expo-checkbox';
import {useContext, useState, useEffect } from "react";
import LargeButton from "./LargeButton";
import * as Calendar from 'expo-calendar';
import * as Permissions from 'expo-permissions';
import { AppContext } from "./AppContext";
import { Dropdown } from 'react-native-element-dropdown';

export default function CleanCreateEvent({route, navigation}){

const { event, setEvent, updateEventField} = useContext(AppContext);
const [val, setVal] = useState(null);
const [isChecked, setChecked] = useState(false);
const [modalVisible, setModalVisible] = useState(false);
const [selectedDate, setSelectedDate] = useState(null);
const [calendarInput, setCalendarInput] = useState("");
const fullDate = "2025-09-03 16:00:00";
const initialDate = fullDate.split(" ")[0];

// Helper: update one field only
const updateEvent = (field, value) => {
    setEvent(prev => ({
      ...prev,
      [field]: value,
    }));
 };

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
    { value: "7", label: "Tarefa" } 
];

    async function createCalendarEvent(text) {
        console.log('Text:', text);
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        if (status === 'granted') {
            const calendars = await Calendar.getCalendarsAsync();
            const defaultCalendar = calendars[0].id;

            const eventId = await Calendar.createEventAsync(defaultCalendar, {
            title: event.titulo,//'Meeting with team'
            startDate: new Date(event.dataInicio),
            endDate: new Date(event.dataTermino),
            location: event.endereco,
            notes: event.descricao,
            alarms: [
            { relativeOffset: -60, method: Calendar.AlarmMethod.ALERT }, // 60 min before
            { relativeOffset: -30, method: Calendar.AlarmMethod.ALERT }, // 30 min before
            { relativeOffset: -5, method: Calendar.AlarmMethod.ALERT }, // 5 min before
            { relativeOffset: -2, method: Calendar.AlarmMethod.ALERT }, // 2 min before
            { relativeOffset: 0, method: Calendar.AlarmMethod.ALERT },  // at event start
        ],
            });
            console.log('Event created with ID:', eventId);
            handlePostRequest(eventId);

            
        }
    }

    const handlePostRequest = async (cod) => {
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
    navigation.navigate('Agenda');
    };

     return(
        <View style={styles.container}>
            <Text style={styles.text}>CleanCreateEvent</Text>
            <LargeButton buttonText={'Navigate'} action={createCalendarEvent} params={'My text'}/>
        </View>

     );

};

const styles = StyleSheet.create({

    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontSize:18,
        fontWeight:'normal',
        padding:15
    }
});