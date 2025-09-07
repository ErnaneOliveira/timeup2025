import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function Web({route, navigation}) {
   
  const url = route.params.url;
  
  return (
    <SafeAreaView style={styles.container}>
      <WebView 
        source={{ uri: url }} 
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});