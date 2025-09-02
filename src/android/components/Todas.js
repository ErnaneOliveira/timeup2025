import { StatusBar, ScrollView, StyleSheet, Text, View } from "react-native";

export default function Todas({route, navigation}){


    return(

        <View style={styles.container}>
            <StatusBar 
        backgroundColor="#2a69b9" // Android only
        barStyle="light-content"   // "dark-content" for dark text/icons
      />
            <Text style={styles.labelText}>Todas</Text>
            
            <ScrollView style={styles.questionNoImage}>
            <View style={styles.dayLabel}>
                <Text style={styles.dayLabelText}>02/09</Text>
            </View>
                <Text style={styles.labelText}>07:30 Levar Theo na escola</Text>
                <Text style={styles.labelText}>08:00 Estudar</Text>
                <Text style={styles.labelText}>10:00 Banho</Text>
                <Text style={styles.labelText}>10:30 Sair para o trabalho</Text>
                <Text style={styles.labelText}>11:00 Pedir comida</Text>
                <Text style={styles.labelText}>12:00 Almoçar</Text>
                <Text style={styles.labelText}>16:40 Sair do Trabalho</Text>
            <View style={styles.dayLabel}>
                    <Text style={styles.dayLabelText}>03/09</Text>
            </View>
                <Text style={styles.labelText}>17:20 Pegar Theo na escola</Text>
                <Text style={styles.labelText}>18:00 Banho</Text>
                <Text style={styles.labelText}>19:00 Para-casa Theo</Text>
                <Text style={styles.labelText}>21:00 Novela Vale-Tudo</Text>
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
  }
});