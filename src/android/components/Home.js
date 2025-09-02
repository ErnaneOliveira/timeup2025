import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";

export default function Home({route, navigation}){

return(
    <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/timeupheader.png')}/>
        <View style={styles.block}>
          <TouchableOpacity onPress={()=> navigation.navigate('Agenda')}>
            <Image style={styles.logo} source={require('../assets/agenda.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate('Eventos')}>
            <Image style={styles.logo} source={require('../assets/plus.png')}/>
        </TouchableOpacity>
        </View>
        <View style={styles.block}>
          <TouchableOpacity onPress={()=> navigation.navigate('Agenda')}>
            <Image style={styles.logo} source={require('../assets/categorias.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> navigation.navigate('Eventos')}>
            <Image style={styles.logo} source={require('../assets/settings.png')}/>
        </TouchableOpacity>
        </View>

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
    borderRadius:25,
    margin:10
  },
  buttonText:{
    color:'white',
    fontWeight:'bold',
    fontSize:18
  },
  image:{
    width:200,
    height:50

  },
  block:{
    height:80,
    flexDirection:'row',
    padding:5
  },
  logo:{
    width:80,
    height:80
  }
});