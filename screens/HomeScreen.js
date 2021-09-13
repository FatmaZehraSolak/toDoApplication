import React, {useEffect, useState} from 'react';
import {ScrollView, View, Button, Text} from 'react-native';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';

import {
  IconButton,
  AddIcon,
  Center,
  List,
  Heading,
  Box,
  CheckIcon,HStack
} from 'native-base';
import firestore from '@react-native-firebase/firestore';

function HomeScreen({navigation}) {
  const [toDoList, setToDoList] = useState([]);
  const ref = firestore().collection('toDo');

  function getTodoList() {
    setToDoList([]);
    ref.onSnapshot(query => {
      // setNewToDo(query.lenght);
      const items = [];
      query.forEach(item => {
        var deneme = item.data().deadline;
        if (deneme != undefined) {
          Object.entries(deneme).map(([key, v]) => {
            if (key == '_seconds') {
              const dateInMillis = v * 1000;

              const date1 = new Date(dateInMillis);
              var date =
                moment( date1.toISOString()).format('DD-MM-YYYY') +
                ' ' +
                new Date(dateInMillis).toLocaleTimeString();
              items.push({
                id: item.id,
                text: item.data(),
                deadline: date.toString(),
              });
            }
          });
        } else {
          items.push({id: item.id, text: item.data(), deadline: null});
        }
      });
      setToDoList(items);
    });
  }

  useEffect(() => {
    getTodoList();
    return () => {
      getTodoList();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScrollView>
      <View style={{flex: 1}}>
        <Center>
          <Heading bold highlight>
            {' '}
            To Do List
          </Heading>
        </Center>
        {toDoList.map(todo => (
          <Box>
            <ListItem
              
              title={todo.text.mission}
              index={todo.id}
              date={todo.deadline}
            />
          </Box>
        ))}

        <GoAddToDoScreenButton navigation={navigation} />
      </View>
    </ScrollView>
  );
}
function GoAddToDoScreenButton({navigation}) {
  return (
    <View>
      <IconButton
        variant="solid"
        onPress={() => navigation.navigate('Add To Do')}
        icon={<AddIcon />}
      />
    </View>
  );
}
const deleteToDo=(index)=>{
  
  firestore().collection("toDo").doc(index).delete()
}
const ListItem = ({title, index, date}) => (
  <List.Item
    key={index}
    bg="emerald.400"
    borderRadius="md"
    justifyContent="center"
    _text={{fontSize: '2xl'}}
    px={1}
    py={2}
    my={2}>
    {title}
    <Box style={ {
      flex: 1,
      width: "80%" // or width of the box - intended margin
  }}/>
    
  
    <DatePicker
    style={{width: 150}}
    date={date}
    mode="date"
    disabled
    placeholder="Not Selected"
    format="YYYY-MM-DD HH:mm"
    minDate="2016-05-01"
    maxDate="2016-06-01"
    confirmBtnText="Confirm"
    cancelBtnText="Cancel"
    customStyles={{
      dateIcon: {
        position: 'absolute',
        left: 0,
        top: 4,
        marginLeft: 0
      },
      dateInput: {
        marginLeft: 36
      }
      // ... You can check the source to find the other keys.
    }}
    
  />
  <IconButton
        variant="solid"
        onPress={()=>deleteToDo(index)}
        icon={<CheckIcon/>}
      />

    
    
  </List.Item>
);

export default HomeScreen;
