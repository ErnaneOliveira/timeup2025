import { StatusBar, SectionList, ScrollView, StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";

export default function Microfundamentos({route, navigation}){


    const [responseData, setResponseData]=useState([]);
      const [sections, setSections]=useState();
    
        useEffect(() => {
    
        const handlePostRequest = async () => {
    
          const response = await fetch("http://atendimento.caed.ufmg.br:8000/timeup2025/getevents.php?codCategoria=2");
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
        const getHeaders=()=>{
    
          
    
          for(let i=0; i<responseData.length; i++){
    
            headers[formatData(responseData[i].dataInicioEvento)]= [];
          }
    
          console.log("Headers: ", headers);
    
          let keys = Object.keys(headers);
          console.log("Keys: ", keys);
    
          for(let j=0; j<keys.length; j++){
            let array =[];
            for(let i=0; i<responseData.length; i++){
                
              if(keys[j]==formatData(responseData[i].dataInicioEvento)){
    
                array.push(formatHour(responseData[i].dataInicioEvento) + " " + responseData[i].tituloEvento);
                 
              }
              headers[keys[j]] = array;
    
            }
          }
    
          console.log(headers);
    
          }
    
    
        
        getHeaders();
    
    
    
        return(
    
            <View style={styles.container}>
            <StatusBar 
              backgroundColor="#2a69b9" // Android only
              barStyle="light-content"   // "dark-content" for dark text/icons
            /> 
                <Text style={styles.labelText}>Provas</Text>
                <ScrollView style={styles.questionNoImage}>
                  {Object.entries(headers).map(([date, events]) => (
                    
            <View key={date} style={styles.section}>
              {/* Header */}
    
              <View style={styles.dayLabel}>
                    <Text style={styles.dayLabelText}>{date}</Text>
              </View>
    
              {/* Events */}
              {events.map((event, idx) => (
                <Text key={idx} style={styles.labelText}>
                  {event}
                </Text>
              ))}
            </View>
          ))}
                </ScrollView>
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
    });