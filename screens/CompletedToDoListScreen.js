import React, {useEffect, useState} from 'react';
import {ScrollView, View,  Text} from 'react-native';
import moment from 'moment';

import {IconButton, AddIcon, Center, List, Heading, Box} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
function CompletedToDoListScreen({navigation}) {
  const [toDoList, setToDoList] = useState([]);
  const ref = firestore().collection('toDo').where('completed', '==', true);

  function getTodoList() {
    setToDoList([]);
    ref.onSnapshot(query => {
      const items = [];
      query.forEach(item => {
        var deadline = item.data().deadline;
        if (deadline != undefined) {
          Object.entries(deadline).map(([key, v]) => {
            if (key == '_seconds') {
              const dateInMillis = v * 1000;

              const date1 = new Date(dateInMillis);
              var date =
                moment(date1.toISOString()).format('DD-MM-YYYY') +
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
           Completed To Do List
          </Heading>
        </Center>
        {toDoList.map(todo => (
          <Box key={todo.id}>
            <ListItem
              title={todo.text.mission}
              index={todo.id}
              date={todo.deadline}
            />
          </Box>
        ))}

        
      </View>
    </ScrollView>
  );
}

const deleteToDo = index => {
  firestore().collection('toDo').doc(index).delete();
};

const ListItem = ({title, index, date}) => (
  <List.Item
    key={index}
    bg="emerald.400"
    borderRadius="md"
    justifyContent="center"
    px={0}
    py={2}
    my={2}>
    {title}
    <Box
      style={{
        flex: 1,
        width: '80%',
      }}
    />

    {date == null ? null : (
      <Icon.Button backgroundColor={''} name="calendar" onPress={null} />
    )}
    {date == null ? null : <Text style={{color:"white"}}>{date + ' '}</Text>}

    <Icon.Button
      color="#000000"
      size={20}
      backgroundColor={''}
      name="trash-o"
      onPress={() => deleteToDo(index)}
    />
  </List.Item>
);

export default CompletedToDoListScreen;
