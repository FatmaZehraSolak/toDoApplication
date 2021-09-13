import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';

import {IconButton, AddIcon, Center, List, Heading} from 'native-base';
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
        items.push({id: item.id, text: item.data()});
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
          <ListItem title={todo.text.mission} index={todo.id} />
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
const ListItem = ({title, index}) => (
  <List.Item
    key={index}
    bg="emerald.400"
    borderRadius="md"
    justifyContent="center"
    _text={{fontSize: '2xl'}}
    px={4}
    py={2}
    my={2}>
    {title}
  </List.Item>
);

export default HomeScreen;
