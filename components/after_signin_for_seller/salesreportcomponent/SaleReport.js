import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

function SaleReport() {
  return (
    <View style={styles.container}>
      <Text>Hello this is sale reportr</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F8F9FC',
  },
});

export default SaleReport;
