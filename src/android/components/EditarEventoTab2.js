import {Button, PermissionsAndroid, Platform, Alert, Image, TextInput, StatusBar, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { AppContext } from "./AppContext";
import { useState, useContext } from "react";
import * as Contacts from 'expo-contacts';
import SelectDropdown from "react-native-select-dropdown";
import * as IntentLauncher from "expo-intent-launcher";
import FileViewer from "react-native-file-viewer";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as WebBrowser from "expo-web-browser";
import LargeButton from "./LargeButton";

export default function EditarEventoTab2({route, navigation}){

   const { event, setEvent, updateEventField} = useContext(AppContext);
   const [value, setValue] = useState(null);
   const [fileUri, setFileUri] = useState("");
   const updateEvent = (field, value) => {
       setEvent(prev => ({
         ...prev,
         [field]: value,
       }));
     };
   
     // pick file
     // Pick document
     const pickDocument = async () => {
       try {
         const result = await DocumentPicker.getDocumentAsync({
           type: "*/*", // allow all types
         });
   
         console.log(result.assets[0].uri);
   
         if (result) {
           setFileUri(result.assets[0].uri);
           updateEvent("arquivo",result.assets[0].uri);
           console.log(event.arquivo);
           console.log(fileUri);
           console.log(result.uri);
   
         }
       } catch (err) {
         console.log("Error picking document:", err);
       }
     };
   
     // Open document
     const openDocument = async () => {
       if (!fileUri) {
         Alert.alert("No file selected");
         return;
       }
   
       try {
         if (Platform.OS === "android") {
           await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
             data: fileUri,
             flags: 1,
           });
         } else {
           await WebBrowser.openBrowserAsync(fileUri);
         }
       } catch (err) {
         console.log("Error opening file:", err);
       }
     };
   
   
   
     const data = [
     { label: "Brazil", value: "BR" },
     { label: "USA", value: "US" },
     { label: "Canada", value: "CA" },
     { label: "France", value: "FR" },];
   
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
   
     const getContacts = async () => {
     const { status } = await Contacts.requestPermissionsAsync();
     if (status === 'granted') {
       const { data } = await Contacts.getContactsAsync({
         fields: [Contacts.Fields.PhoneNumbers],
       });
   
       if (data.length > 0) {
         console.log(data[0]); // first contact
       }
     }
   };
   
   const openContactPicker = async () => {
   
     const { status } = await Contacts.requestPermissionsAsync();
   
     IntentLauncher.startActivityAsync("android.intent.action.PICK", {
       data: "content://contacts/people",
     });
   
   };
   
   const [selected, setSelected] = useState(null);
   const pickContact = async () => {
       const { status } = await Contacts.requestPermissionsAsync();
   
       console.log(status);
   
       try {
         const result = await IntentLauncher.startActivityAsync(
           "android.intent.action.PICK",
           { data: "content://contacts/people" }
         );
   
         if (result.resultCode === 0) {
           console.log("Picker cancelled");
           return;
         }
   
         // On Android, we get content://contacts/people/{id}
         const uri = result.data;
         console.log("Contact URI:", uri);
   
         // Extract the ID (last part of URI)
         const contactId = uri.split("/").pop();
   
         // Fetch full contact details
         const contact = await Contacts.getContactByIdAsync(contactId);
         setSelected(contact);
         console.log("Contact: ", selected)
       } catch (err) {
         console.log("Error opening contact picker:", err);
       }
     };
   
     async function getContactFromUri(uri) {
     // Extract lookup key from URI (after ".../lookup/")
     const parts = uri.split("/lookup/")[1].split("/");
     const lookupKey = parts[0];
   
     // Fetch all contacts (you can paginate if needed)
     const { data } = await Contacts.getContactsAsync({
       fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
     });
   
     // Find the one that matches
     return data.find(c => c.lookupKey === lookupKey) || null;
   }
   
   async function resolveContactFromUri(uri) {
     // Try direct ID
     const id = uri.split("/").pop();
     let contact = await Contacts.getContactByIdAsync(id);
     if (contact) return contact;
   
     // If not found, try lookupKey
     const parts = uri.split("/lookup/")[1].split("/");
     const lookupKey = parts[0];
   
     const { data } = await Contacts.getContactsAsync({
       fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
     });
   
     return data.find(c => c.lookupKey === lookupKey) || null;
   }
   
   const getResult =async ()=>{
   
     const result = await IntentLauncher.startActivityAsync(
           "android.intent.action.PICK",
           { data: "content://contacts/people" }
         );
   
   if (result.resultCode !== 0) {
     const uri = result.data;
     const contact = await resolveContactFromUri(uri);
   
     const phoneNumber = contact.phoneNumbers[0].number;
   
     updateEvent("nomeContato",contact.name);
     updateEvent("numeroContato", phoneNumber);
   
     console.log("Selected contact:", contact);
     console.log("Number", phoneNumber )
   }
   
   
   }
   
   
   
   return(
       <View style={styles.container}>
         <StatusBar 
                   backgroundColor="#2a69b9" // Android only
                   barStyle="light-content"   // "dark-content" for dark text/icons
                 /> 
           
           <View style={styles.questionNoImage}>
               <Text style={styles.labelText}>Link da tarefa</Text>
               <View style={{flexDirection:'row', justifyContent:'flex-end', alignItems:'flex-end'}}>
                 <TextInput value={event.link} onChangeText={(text) => updateEvent("link", text)}style={[styles.textInput,{width:300}]}></TextInput>
                 <TouchableOpacity onPress={()=> navigation.navigate('WebView',{url: event.link})}>
                     <Image style={styles.logo} source={require('../assets/link.png')}></Image>
                 </TouchableOpacity>
               </View>
               
           </View>
           <View style={styles.questionNoImage}>
               <Text style={styles.labelText}>Anexar Arquivo</Text>
               <View style={{flexDirection:'row'}}>
                 <TextInput value={event.arquivo} onChangeText={(text) => updateEvent("arquivo", text)}style={[styles.textInput,{width:300}]}></TextInput>
                 <TouchableOpacity onPress={pickDocument} >
                   <Image style={styles.logo} source={require('../assets/arquivo.png')}></Image>
                 </TouchableOpacity>
                 
               </View>
               
           </View>
           <View style={styles.questionNoImage}>
               <Text style={styles.labelText}>Nome Contato</Text>
               <View style={{flexDirection:'row'}}>
                 <TextInput value={event.nomeContato} onChangeText={(text) => updateEvent("nomeContato", text)}style={[styles.textInput,{width:300}]}></TextInput>
                 <TouchableOpacity onPress={getResult}>
                     <Image style={styles.logo} source={require('../assets/contato.png')}></Image>
                 </TouchableOpacity>
               </View>
                 
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
               <LargeButton buttonText={'Criar evento'} action={console.log} params={'Button 2'}></LargeButton>
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
     logo:{
        width:40,
        height:40,
        resizeMode:'contain'
     }
     
   });