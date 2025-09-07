import {Linking, Image, StatusBar, TextInput, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { AppContext } from "./AppContext";
import { useContext } from "react";

export default function ViewEventTab2({route, navigation}){

const { event, setEvent, updateEventField} = useContext(AppContext);
const updateEvent = (field, value) => {
    setEvent(prev => ({
      ...prev,
      [field]: value,
    }));
  };

const openGmail = (email, subject) => {
    const to = email;
    const body = "This is a test email body.";

    // encode URI components to handle spaces & special chars
    const url = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(url).catch(err => console.error("Error:", err));
  };


const openWhatsApp = (phoneNumber, message = "") => {
  // WhatsApp expects phone numbers in international format without "+" or spaces
  const formattedNumber = phoneNumber.replace(/\D/g, ""); // remove non-digits

  let url = `whatsapp://send?phone=${formattedNumber}`;

  if (message) {
    url += `&text=${encodeURIComponent(message)}`;
  }

  Linking.canOpenURL(url)
    .then((supported) => {
      if (!supported) {
        alert("WhatsApp is not installed on this device");
      } else {
        return Linking.openURL(url);
      }
    })
    .catch((err) => console.error("Error opening WhatsApp:", err));
};

return(
    <View style={styles.container}>
      <StatusBar 
                backgroundColor="#2a69b9" // Android only
                barStyle="light-content"   // "dark-content" for dark text/icons
              /> 
        <View style={styles.questionNoImage}>
            <Text style={styles.labelText}>Categoria</Text>
            <Text style={[styles.textInput, {width:300, justifyContent:'flex-end', alignItems:'flex-end'}]}>{event.codCategoria}</Text>
        </View>
        <View style={styles.questionNoImage}>
            <Text style={styles.labelText}>Link da tarefa</Text>
            <View style={{flexDirection:'row', justifyContent:'flex-end', alignItems:'flex-end'}}>
            <Text style={[styles.textInput, {width:300, }]}>{event.link}</Text>
            <TouchableOpacity onPress={()=> navigation.navigate('WebView',{url: event.link})}>
              <Image style={styles.logo} source={require('../assets/link.png')}></Image>
            </TouchableOpacity>
            
            </View>
        </View>
        <View style={styles.questionNoImage}>
            <Text style={styles.labelText}>Anexar Arquivo</Text>
            <View style={{flexDirection:'row'}}>
            <Text style={[styles.textInput, {width:300, justifyContent:'flex-end', alignItems:'flex-end'}]}>{event.arquivo}</Text>
            <Image style={styles.logo} source={require('../assets/arquivo.png')}></Image>
            </View>
        </View>
        <View style={styles.questionNoImage}>
            <Text style={styles.labelText}>Nome Contato</Text>
            <View style={{flexDirection:'row'}}>
            <Text style={[styles.textInput, {width:300, justifyContent:'flex-end', alignItems:'flex-end'}]}>{event.nomeContato}</Text>
            <TouchableOpacity onPress={()=> openWhatsApp(event.numeroContato, "Hello from my RN app!")}>
              <Image style={styles.logo} source={require('../assets/contato.png')}></Image>
            </TouchableOpacity>
            </View>
        </View>
        <View style={styles.questionNoImage}>
            <Text style={styles.labelText}>Número</Text>
            <Text style={[styles.textInput, {width:300, justifyContent:'flex-end', alignItems:'flex-end'}]}>{event.numeroContato}</Text>
        </View>
        <View style={styles.questionNoImage}>
            <Text style={styles.labelText}>E-mail</Text>
            <View style={{flexDirection:'row'}}>
              <Text style={[styles.textInput, {width:300, justifyContent:'flex-end', alignItems:'flex-end'}]}>{event.email}</Text>
              <TouchableOpacity onPress={()=> openGmail(event.email, event.titulo)}>
                <Image style={styles.logo} source={require('../assets/email.png')}></Image>
              </TouchableOpacity>
            </View>
            
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