import { StatusBar, TouchableOpacity, SectionList, ScrollView, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import Category from "./Category";
import TabButton from "./TabButton";

export default function Todas({route, navigation}){

  const [responseData, setResponseData]=useState([]);
  const [sections, setSections]=useState();
  const { data } = route.params || [];
  const codCategory = route.params.codCategory;
  const [selectedIndex, setSelectedIndex] = useState(3);
  let filtered ={};
  const [head, setHead]= useState({});

  const handlePostRequest = async () => {

      const response = await fetch("http://atendimento.caed.ufmg.br:8000/timeup2025/getevents.php?codCategoria=%");
      const text = await response.text();
      //console.log("Raw response:", text);

      // Try parse JSON if possible
      try {
        const data = JSON.parse(text);
        setResponseData(data);
        //console.log(data);
      } catch {
        console.warn("Response is not valid JSON");
      }
      
    };


    useEffect(() => {

    const handlePostRequest = async () => {

      const response = await fetch("http://atendimento.caed.ufmg.br:8000/timeup2025/getevents.php?codCategoria=%");
      const text = await response.text();
      //console.log("Raw response:", text);

      // Try parse JSON if possible
      try {
        const data = JSON.parse(text);
        setResponseData(data);
        //console.log(data);
      } catch {
        console.warn("Response is not valid JSON");
      }
      
    };
    handlePostRequest();
    getSelectedCategory(3);

    
    
  }, []);

    const formatData=(date)=>{

      //2025-09-03 08:00:00

      if(!date){
        return "01-01";
      }

      let newDate= date.split(" ");
      newDate = newDate[0].split("-")[2]+"-"+newDate[0].split("-")[1];

      return newDate;


    }

    const formatHour=(date)=>{

      //2025-09-03 08:00:00

      if(!date){
        return "08-00";
      }

      let newHour= date.split(" ");
      newHour= newHour[1].split(":")[0]+":"+newHour[1].split(":")[1];

      return newHour;


    }
    let headers = {};
    
    const getHeaders=async (categoria)=>{

      for(let i=0; i<responseData.length; i++){

        if(responseData[i].codCategoria==categoria){
        headers[formatData(responseData[i].dataInicioEvento)]= [];
        }
      }

      console.log("Headers: ", headers);

      let keys = Object.keys(headers);
      console.log("Keys: ", keys);

      for(let j=0; j<keys.length; j++){
        let array =[];
        for(let i=0; i<responseData.length; i++){
            
          if(keys[j]==formatData(responseData[i].dataInicioEvento) && responseData[i].codCategoria==categoria){

            array.push({
            titulo: formatHour(responseData[i].dataInicioEvento) + " " + responseData[i].tituloEvento,
            codEvento: responseData[i].codEvento, codCategoria: responseData[i].codCategoria});
             
          }

          headers[keys[j]] = array;
                   

        }

        
      }
      
      console.log(headers);
      
      

      }

      

      const getSelectedCategory=(cod)=>{

        getHeaders(cod);
        setSelectedIndex(cod);
        setHead(headers);

      } 
    
    

    const selected ='#c7fcce';
    const defaultColor = "#f4f4f4";

    const categorias = [ 
    {value: "0", label: "Consulta" }, 
    { value: "8", label: "Edição" }, 
    { value: "5", label: "Etapa" }, 
    { value: "1", label: "Evento" }, 
    { value: "3", label: "Gravação" }, 
    { value: "10", label: "Live" }, 
    { value: "6", label: "MF" }, 
    { value: "2", label: "Prova" }, 
    { value: "4", label: "Reserva" }, 
    { value: "9", label: "Reunião" }, 
    { value: "7", label: "Tarefa" } ];


    return(

      <View style={styles.container}>
        <StatusBar 
          backgroundColor="#2a69b9" // Android only
          barStyle="light-content"   // "dark-content" for dark text/icons
        /> 
            <Text style={styles.labelHeader}>Todas</Text>
            <ScrollView horizontal={true} style={{height:80}}>
              {categorias.map((button, index) => (
                
              <TabButton key={index} 
                label={button.label} 
                action={getSelectedCategory}
                params={(button.value)} 
                mycolor={button.value === selectedIndex.toString()? selected : defaultColor}/>
                
                ))}

            </ScrollView>
            
            <ScrollView style={styles.questionNoImage}>
              {Object.entries(head).map(([date, events]) => (
                
        <View key={date} style={styles.section}>
          {/* Header */}

          <View style={styles.dayLabel}>
                <Text style={styles.dayLabelText}>{date}</Text>
          </View>

          {/* Events */}
          {events.map((event, idx) => (
            <Text key={idx} style={styles.labelText} onPress={()=> navigation.navigate('Detalhes',{codEvento: event.codEvento})}>
              {event.titulo}
            </Text>
          ))}
        </View>
      ))}
            </ScrollView>
            {/* Floating Action Button */}
            <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('Eventos')}>
                <Text style={styles.fabIcon}>+</Text>
            </TouchableOpacity>
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
    marginLeft:15,
    marginTop:15,
    marginBottom:10
  },
  labelText:{
    color:'black',
    fontSize:18,
    padding:15,
    borderBottomWidth:0.5
  },
  dayLabelText:{
    color:'white',
    fontWeight:'bold',
    fontSize:18,
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
  dayLabel:{
    backgroundColor:'blue',
    margin:15,
    padding:15,
    width:350,
    alignItems:'center',
    justifyContent:'center',
  },
  header: {
    fontWeight: "bold",
    fontSize: 18,
    marginTop: 12,
  },
  item: {
    fontSize: 16,
    marginLeft: 10,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#6200ee",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  fabIcon: {
    fontSize: 28,
    color: "white",
  },
  labelHeader:{
    color:'black',
    fontSize:20,
    padding:15,
    fontWeight:'bold',
    textAlign:'center'
  },
});