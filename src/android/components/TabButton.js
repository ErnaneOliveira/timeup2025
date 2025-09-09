import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";

export default function TabButton({label, action, mycolor}){

    const selected ='#c7fcce';
    const defaultColor = "#f4f4f4";

    const [color, setColor]=useState(defaultColor);
    const [selectedIndex, setSelectedIndex] = useState();
    

    console.log('Label: ', label, ' action: ', action, ' color', color);

    console.log(color);

    useEffect(() => {
        setColor(mycolor);
    }, []);


    return(
        <TouchableOpacity onPress={()=> {setSelectedIndex({action})}} style={[styles.button, {backgroundColor: color}]}>
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
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
    }

});