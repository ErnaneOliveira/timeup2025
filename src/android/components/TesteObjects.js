import { StyleSheet, View, Text, FlatList } from "react-native";

export default function TesteObjects() {
  const array = [{"08:09": [
    { codEvento: 1, titulo: "08:00 Meeting" },
    { codEvento: 2, titulo: "09:30 Call with client" },
    { codEvento: 3, titulo: "11:00 Lunch" },
  ]},
{"09:09": [
    { codEvento: 1, titulo: "08:00 Meeting" },
    { codEvento: 2, titulo: "09:30 Call with client" },
    { codEvento: 3, titulo: "11:00 Lunch" },
  ]}];

  const headers= [
    {"03-09": [
        {"codEvento": "2", "titulo": "08:00 Título do evento"}, 
        {"codEvento": "3", "titulo": "08:00 Banho"}, 
        {"codEvento": "4", "titulo": "08:00 Estudar"}, 
        {"codEvento": "5", "titulo": "08:00 Levar Theo na escola"}, 
        {"codEvento": "6", "titulo": "08:00 Buscar Theo na escola"}, 
        {"codEvento": "7", "titulo": "08:00 Título do evento"}, 
        {"codEvento": "1", "titulo": "14:00 Gravação"}], 
    "05-09": [
            {"codEvento": "15", "titulo": "14:00 Transmissão de webinar"}], 
    "07-09": [
                {"codEvento": "16", "titulo": "16:00 Aula de Harmonia- Thompson "}], 
    "08-09": [
        {"codEvento": "12", "titulo": "14:00 Gravação Lilian PGD"}, 
        {"codEvento": "8", "titulo": "20:00 Insert title"}], 
    "09-09": [{"codEvento": "9", "titulo": "20:00 Insert title"}], 
    "10-09": [{"codEvento": "10", "titulo": "20:00 Insert title"}], 
    "11-09": [{"codEvento": "11", "titulo": "20:00 Insert title"}, {"codEvento": "13", "titulo": "20:00 Insert title"}, 
        {"codEvento": "14", "titulo": "20:00 Insert title"}]}
  ];

  console.log(headers);
  //console.log(Object.entries(array));

  return (
    <View style={styles.container}>
      {headers.map((obj, i) => {
        return Object.entries(obj).map(([time, events]) => (
          <View key={time}>
            <Text style={{ fontWeight: "bold", marginTop: 10 }}>{time}</Text>
            {events.map((event) => (
              <Text key={event.codEvento}>• {event.titulo}</Text>
            ))}
          </View>
        ));
      })}
      
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
       labelHeader:{
     color:'black',
     fontSize:20,
     padding:15,
     fontWeight:'bold',
     textAlign:'center'
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
   }
     });


      
                      
              
                
      
                
              
 
