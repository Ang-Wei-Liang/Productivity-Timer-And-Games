import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,

  //TextInput,
} from 'react-native';
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Button } from '@react-native-material/core';
import { Stack, TextInput, IconButton } from '@react-native-material/core';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import { useFonts } from 'expo-font';

//import { NeomorphBox } from 'react-native-neomorph-shadows';

/*const generateColor2 = () => {
  const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0');
  return `#${randomColor}`;
};*/
function generateColor() {
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += Math.floor(Math.random() * 10);
  }
  return color;
}

const Item = ({ name, onPress, isSelected, onFavoritePress, navigation }) => {
  const [focused, setFocused] = useState(isSelected);
  const style = styles.normal; // Add default value for style prop

  const handlePress = () => {
    setFocused(!focused);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Text style={style}>{name}</Text>
        <View style={styles.starContainer}>
          <TouchableOpacity onPress={handlePress}>
            <MaterialCommunityIcons
              name="star"
              color={focused ? 'yellow' : 'white'}
              size={36}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const TextInputTop = () => {
  const [text, onChangeText] = React.useState('Useless Text');
  const [number, onChangeNumber] = React.useState(null);

  return (
    <SafeAreaView>
      <Stack spacing={2} style={styles.input}>
        <TextInput
          maxLength={15}
          label="Search"
          variant="outlined"
          placeholder="Search"
          trailing={(props) => (
            <IconButton
              icon={(props) => <Icon name="text-search" {...props} />}
              {...props}
            />
          )}
          onChangeText={onChangeNumber}
        />
      </Stack>
    </SafeAreaView>
  );
};

function Rewards3Screen(props) {
  const [items, setItems] = useState([
    { id: '1', name: 'Alice', isFavorite: false },
    { id: '2', name: 'Bob', isFavorite: false },
    { id: '3', name: 'Charlie', isFavorite: false },
    { id: '4', name: 'Donkey', isFavorite: false },
    { id: '5', name: 'Elle', isFavorite: false },
    { id: '6', name: 'Fred', isFavorite: false },
    { id: '7', name: 'Gotham', isFavorite: false },
    { id: '8', name: 'Harry', isFavorite: false },
    { id: '9', name: 'Igloo', isFavorite: false },
  ]);

  //const [style, setStyle] = useState(styles.normal);

  const onFavoritePress = (id) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, isFavorite: !item.isFavorite };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const onPress = (item) => {
    const updatedItems = [item, ...items.filter((i) => i.id !== item.id)];
    setItems(updatedItems);
  };

  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          console.log('Dismiss');
        }}>
        

        <View style={styles.container}>
        
          <TextInputTop />

          <View style={{ flex: 1, margin: 13 }}>
            <FlatList
              scrollEnabled={true}
              //keyboardShouldPersistTaps = {always}
              data={items}
              renderItem={({ item }) => (
                <View
                  style={[
                    { backgroundColor: generateColor() },
                    styles.containerInner,
                  ]}>
                  <TouchableOpacity>
                    {item.isFavorite ? (
                      <View>
                        <Text>{item.name} (Favorite Category)</Text>
                      </View>
                    ) : (
                      //<TouchableOpacity >

                      <Item
                        name={item.name}
                        onPress={() => onPress(item)}
                        isSelected={item.isFavorite}
                        onFavoritePress={() => onFavoritePress(item.id)}
                        style={styles.itemStyle}
                        navigation={props.navigation}
                      />

                      //</TouchableOpacity>
                    )}
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    //backgroundColor: '#ecf0f1',
    backgroundColor: 'lightblue',
    padding: 12,

    alignItems: 'center',
  },

  containerInner: {
    textAlign: 'center',
    padding: 15,
    margin: 18,
    borderWidth: 3,
    //borderColor: "red",
    borderColor: 'lightgreen',
    width: 300,
    height: 70,
    //backgroundColor: 'green',
    borderRadius: 15,

    //backgroundColor: this.state.isFavorite ? 'green' : 'blue',
  },
  itemStyle: {
    color: 'purple',
  },
  input: {
    height: 35,
    width: 280,
    marginTop: 30,
    marginBottom: 40,
    //borderWidth: 1,
    paddingBottom: 1,
    //border: '2px solid green',
  },

  normal: {
    fontSize: 18,
    color: 'white',
    fontWeight: '300',
  },

  starContainer: {
    marginLeft: 100,
  },
});

export default Rewards3Screen;
