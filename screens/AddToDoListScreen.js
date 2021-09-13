import React, {useState} from 'react';
import {View, Button} from 'react-native';

import {Input, Text} from 'native-base';
import firestore from '@react-native-firebase/firestore';
function AddToDoListScreen({navigation}) {
  const [newToDo, setNewToDO] = useState(' ');
  const addFireStore = () => {
    firestore().collection('toDo').add({mission: newToDo});
    navigation.goBack();
  };
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
      <Text>What Are Yo Planning</Text>
      <Input
        width="100%"
        variant="filled"
        value={newToDo}
        onChangeText={text => setNewToDO(text)}
      />
      <Button variant="solid" title="ADD" onPress={addFireStore} />
    </View>
  );
}
export default AddToDoListScreen;
