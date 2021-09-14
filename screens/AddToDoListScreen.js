import React, {useState} from 'react';
import {View, Button} from 'react-native';

import {Input, Text,Box} from 'native-base';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import firestore from '@react-native-firebase/firestore';
function AddToDoListScreen({navigation}) {
  const [newToDo, setNewToDo] = useState(' ');
  const [newToDoDate, setNewToDoDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setNewToDoDate(date);
    hideDatePicker();
  };
  const addFireStore = () => {
    firestore().collection('toDo').add({mission: newToDo,deadline:newToDoDate,completed:false});
    navigation.goBack();
  };
  
  
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start'}}>
      <Text>What Are Yo Planning ?</Text>
      <Input
        width="100%"
        variant="filled"
        value={newToDo}
        onChangeText={text => setNewToDo(text)}
      />
      <Box height="5"/>
     <Button title="Pick Deadline" onPress={showDatePicker} />   
    <Box height="5"/>
      <Button variant="solid" title="ADD" onPress={addFireStore} />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

    </View>
  );
}
export default AddToDoListScreen;
