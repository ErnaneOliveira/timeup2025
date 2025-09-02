import {TextInput, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function EventTab2(){

return(
    <View style={styles.container}>
        <View style={styles.questionNoImage}>
            <Text style={styles.labelText}>Categoria</Text>
            <TextInput style={styles.textInput}></TextInput>
        </View>
        <View style={styles.questionNoImage}>
            <Text style={styles.labelText}>Link da tarefa</Text>
            <TextInput style={styles.textInput}></TextInput>
        </View>
        <View style={styles.questionNoImage}>
            <Text style={styles.labelText}>Anexar Arquivo</Text>
            <TextInput style={styles.textInput}></TextInput>
        </View>
        <View style={styles.questionNoImage}>
            <Text style={styles.labelText}>Nome Contato</Text>
            <TextInput style={styles.textInput}></TextInput>
        </View>
        <View style={styles.questionNoImage}>
            <Text style={styles.labelText}>Número</Text>
            <TextInput style={styles.textInput}></TextInput>
        </View>
        <View style={styles.questionNoImage}>
            <Text style={styles.labelText}>E-mail</Text>
            <TextInput style={styles.textInput}></TextInput>
        </View>
        <View style={styles.centerView}>
            <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Eventos')}>
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
  },
  dropdown: {
      height: 50,
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
      fontSize: 16
    }
});