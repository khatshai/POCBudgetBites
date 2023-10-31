import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Inventory() {
  return (
    <View style={styles.container}>
      <Text>Hello This is Inventory</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F8F9FC',
  },
});
export default Inventory;
