  import {TextInput, StatusBar, StyleSheet, View, Text, TouchableOpacity } from "react-native";
  import { Dropdown } from "react-native-element-dropdown";
  import { AppContext } from "./AppContext";
  import { useState, useContext } from "react";

  export default function EventTab3(){

    const { event, setEvent, updateEventField} = useContext(AppContext);
const updateEvent = (field, value) => {
    setEvent(prev => ({
      ...prev,
      [field]: value,
    }));
  };

    const data = [
  { label: "Brazil", value: "BR" },
  { label: "USA", value: "US" },
  { label: "Canada", value: "CA" },
  { label: "France", value: "FR" },
];

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

const [value, setValue] = useState(null);

    return (
      <View style={styles.container}>
        <StatusBar 
                backgroundColor="#2a69b9" // Android only
                barStyle="light-content"   // "dark-content" for dark text/icons
              />
      <Text style={styles.label}>Categoria</Text>
      <View style={{padding: 20, flex: 1, justifyContent: "center" }}>
        <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={categorias}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Escolhe a categoria"
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                  console.log("Selected:", item);
                }}
              />
      </View>
      

      <View style={styles.questionNoImage}>
                  <Text style={styles.labelText}>Link da tarefa</Text>
                  <TextInput value={event.link} onChangeText={(text) => updateEvent("link", text)}style={styles.textInput}></TextInput>
      </View>
              <View style={styles.questionNoImage}>
                  <Text style={styles.labelText}>Anexar Arquivo</Text>
                  <TextInput value={event.arquivo} onChangeText={(text) => updateEvent("arquivo", text)}style={styles.textInput}></TextInput>
              </View>
              <View style={styles.questionNoImage}>
                  <Text style={styles.labelText}>Nome Contato</Text>
                  <TextInput value={event.nomeContato} onChangeText={(text) => updateEvent("nomeContato", text)}style={styles.textInput}></TextInput>
              </View>
              <View style={styles.questionNoImage}>
                  <Text style={styles.labelText}>Número</Text>
                  <TextInput value={event.numeroContato} onChangeText={(text) => updateEvent("numeroContato", text)}style={styles.textInput}></TextInput>
              </View>
              <View style={styles.questionNoImage}>
                  <Text style={styles.labelText}>E-mail</Text>
                  <TextInput value={event.email} onChangeText={(text) => updateEvent("email", text)}style={styles.textInput}></TextInput>
              </View>
              <View style={styles.centerView}>
                  <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Eventos')}>
                      <Text style={styles.buttonText}>Criar Evento</Text>
                  </TouchableOpacity>
              </View>
      
    </View>  
    );
  };


  const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  
    dropdown: {
      height: 50,
      width:360,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
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
  icon: {
      marginRight: 5,
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
  },
  placeholderStyle: {
    fontSize: 16,
    color: "gray",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "black",
  },
  label2: { marginBottom: 8, fontSize: 16 },
  
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16
    }
  });