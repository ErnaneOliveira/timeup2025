import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function Home({route, navigation}){

return(
    <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Eventos')}>
            <Text style={styles.buttonText}>Criar Evento</Text>
        </TouchableOpacity>
    </View>
);

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    backgroundColor:'blue',
    padding:15,
    borderRadius:25
  },
  buttonText:{
    color:'white',
    fontWeight:'bold',
    fontSize:18
  }
});