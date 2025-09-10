import { TouchableOpacity, View, StyleSheet, Text } from "react-native";


export default function LargeButton({buttonText, action, params, color}){

    return(

        <TouchableOpacity style={[styles.button, {backgroundColor: color? color: '#1dab61'}]} onPress={()=> action(params)}>
            <Text style={styles.labelText}>   
                {buttonText}
            </Text>
        </TouchableOpacity>

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
    alignItems:'center',
    margin:15,
    marginBottom:0
   },
   logo:{
    width:200,
    height:120,
    margin:15,
    padding:25,
    resizeMode:'contain'
   }

});