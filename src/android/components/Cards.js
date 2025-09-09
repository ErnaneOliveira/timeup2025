import {View, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';
import LargeButton from './LargeButton';



export default function Cards(){

    return(

        <View style={styles.container}>

            <View style={styles.card}>
            <Image source={require('../assets/devices.png')} style={styles.logo}></Image>
                        <Text style={styles.text}>   
                            Você pode conectar mais dispositivos a essa conta.
                        </Text>
                        <LargeButton buttonText={'Connect device'}></LargeButton>
            </View>

            <View style={styles.card}>
                <Text style={styles.text}>   
                    Você pode conectar mais dispositivos a essa conta.
                </Text>
                <LargeButton buttonText={'My connection'}></LargeButton>

            </View>



        </View>

    );

}

const styles = StyleSheet.create({
   container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
   },
   card:{
    backgroundColor: 'white',
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    marginBottom: 15
   },

   labelText:{
     
    fontSize:18,
    fontWeight: 'bold',
    color:'white'

   },
   text:{
     
    fontSize:18,
    fontWeight: 'bold',
    textAlign:'center',
    margin:15,
    padding:25

   },

   button:{
    padding:18,
    backgroundColor: '#1dab61',
    borderRadius: 35,
    width:350,
    alignItems:'center'
   },
   logo:{
    width:200,
    height:120,
    margin:15,
    padding:25,
    resizeMode:'contain'
   }

});