import React from 'react';
import {Menu, HamburgerIcon} from 'native-base';
import {Pressable} from 'react-native';
import { useNavigation} from '@react-navigation/native';
function MenuComponent() {
  const navigation = useNavigation();
  return (
    <Menu
      trigger={triggerProps => {
        return (
          <Pressable accessibilityLabel="More options menu" {...triggerProps}>
            <HamburgerIcon />
          </Pressable>
        );
      }}>
      <Menu.Item onPress={() => navigation.navigate('Add To Do')}>
        Add To Do
      </Menu.Item>

      <Menu.Item onPress={() => navigation.navigate('Completed To Do')}>Completed To Do</Menu.Item>
    </Menu>
  );
}
export default MenuComponent;
