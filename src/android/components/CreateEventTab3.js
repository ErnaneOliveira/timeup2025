import React, { useState } from 'react';
  import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
  import SelectDropdown from "react-native-select-dropdown";
  import { Dropdown } from "react-native-element-dropdown";

  export default function EventTab3(){

    const data = [
  { label: "Brazil", value: "BR" },
  { label: "USA", value: "US" },
  { label: "Canada", value: "CA" },
  { label: "France", value: "FR" },
];

const [value, setValue] = useState(null);

    return (
      <View style={styles.container}>
      <Text style={styles.label}>Categoria</Text>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder="Escolhe a categoria"
        value={value}
        onChange={(item) => {
          setValue(item.value);
          console.log("Selected:", item);
        }}
      />
    </View>
    );
  };


  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
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
      fontSize: 16,
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
  }
  });