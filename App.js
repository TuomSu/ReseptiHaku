import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, FlatList, Image } from 'react-native';
import React, { useState, useRef } from 'react';

export default function App() {

  const [keyword, setKeyword] = useState('');
  const [repositories, setRepositories] = useState([]);

  const getRepositories = () => { 
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)  
    .then(response => response.json())  
    .then(data => setRepositories(data.meals))  
    .catch(error => {         
      Alert.alert('Error', error);   
    });
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "80%",
          backgroundColor: "#CED0CE",
          marginLeft: "10%"
        }}
      />
    );
  };

  return (
    <View style={styles.container}>  
<FlatList 
keyExtractor={(item,index) => index.toString()}  
renderItem={({item}) =>
<View>
  <Text 
  style={{fontSize:18, fontWeight: "bold"}}>{item.strMeal}
  </Text>
  <Image source={{uri:`${item.strMealThumb}`}}
       style={{width: 50, height: 50}} />
  </View>}  
  data={repositories} 
  ItemSeparatorComponent={listSeparator} /> 
  
  <TextInput style={{fontSize:18, width:200}} 
      placeholder='keyword'
      onChangeText={text => setKeyword(text) } />
      <Button title="Find" onPress= {getRepositories} />
      <StatusBar style="auto" />
  </View>
)}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

