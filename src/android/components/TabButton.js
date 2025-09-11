import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";

export default function TabButton({label, action, mycolor, params}){

    const selected ='#c7fcce';
    const defaultColor = "#f4f4f4";

    const [color, setColor]=useState(defaultColor);
    const [selectedIndex, setSelectedIndex] = useState();

    useEffect(() => {
        setColor(mycolor);
    }, [mycolor]);


    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={()=> [action(params)]} style={[styles.button, {backgroundColor: color}]}>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
        </View>
        
    )
};

const styles = StyleSheet.create({

    button: {
        padding:20,
        borderRadius:25,
        marginLeft: 10
        
    },
    label:{
        fontSize:16
    },
    container:{

        height:80,
        flex:1,
        alignItems:'flex-start'

    }

});