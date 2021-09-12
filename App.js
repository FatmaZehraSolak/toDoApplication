/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  IconButton,
  AddIcon,
  Center,
  Input,
  NativeBaseProvider,
  List,
  Text,
  Heading,
} from 'native-base';
import firestore from '@react-native-firebase/firestore';

function AddButton({navigation}) {
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
  const Item = ({title, index}) => (
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
          <Item title={todo.text.mission} index={todo.id} />
        ))}

        <AddButton navigation={navigation} />
      </View>
    </ScrollView>
  );
}

function AddToDoScreen({navigation}) {
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
const Stack = createNativeStackNavigator();
function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Add To Do" component={AddToDoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  addButton: {
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default App;
