import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Profile() {
  return (
    <View style={styles.container}>
      <Text>Hello Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F8F9FC',
  },
});

export default Profile;
