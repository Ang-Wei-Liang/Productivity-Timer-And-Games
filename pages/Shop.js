import * as React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Constants from 'expo-constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useTheme } from 'react-native-paper';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
//import MoneyTrack from './MoneyTrack.js';

//import {Divider} from '@rneui/themed';





import MoneyTrack from '../pages/MoneyTrack.js';
//const image = { uri: "https://reactjs.org/logo-og.png" };
import { useFonts } from 'expo-font';

//import ImageBg from './imagesBg.js';

const Item = ({ price, color, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.itemContainer, { backgroundColor: color }]}>
      <Text style={styles.itemPrice}>{price}$</Text>
      <Icon
        style={styles.itemIcon}
        name="treasure-chest"
        size={20}
        color="white"
      />
    </TouchableOpacity>
  );
};

const Col1 = () => {
  return (
    <View style={styles.colContainer}>
      <Item
        price="40"
        color="black"
        onPress={() => console.log('item1 pressed')}
      />
      <Item
        price="60"
        color="green"
        onPress={() => console.log('item2 pressed')}
      />
      <Item
        price="80"
        color="violet"
        onPress={() => console.log('item3 pressed')}
      />
      <Item
        price="200"
        color="orange"
        onPress={() => console.log('item4 pressed')}
      />
      <Item
        price="400"
        color="darkgrey"
        onPress={() => console.log('item5 pressed')}
      />
    </View>
  );
};

const Col2 = () => {
  return (
    <View style={styles.colContainer}>
      <TouchableOpacity>
        <Item
          price="40"
          color="red"
          onPress={() => console.log('item1 pressed')}
        />
      </TouchableOpacity>
      <Item
        price="60"
        color="brown"
        onPress={() => console.log('item2 pressed')}
      />
      <Item
        price="80"
        color="purple"
        onPress={() => console.log('item3 pressed')}
      />
      <Item
        price="300"
        color="darkorange"
        onPress={() => console.log('item4 pressed')}
      />
      <Item
        price="800"
        color="black"
        onPress={() => console.log('item5 pressed')}
      />
    </View>
  );
};

function ShopScreen(props) {
  const { colors } = useTheme();
  const [loaded] = useFonts({
    Jelly: require('../assets/Jua-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.containerM}>
          <MoneyTrack />
        </View>

        <Text style={[{fontFamily: 'Jelly'}, styles.caption]}>Greetings, buy stuff here!</Text>
        


        <ScrollView style={styles.scrollView}>
          <View style={styles.itemsContainer}>
            <Col1 />
            <Col1 />
            <Col2 />
          </View>
        </ScrollView>

        <Text style={[{fontFamily: 'Jelly'}, styles.lastCaption]}>Last Obtained: Sergeant</Text>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightcyan',
    alignItems: 'center',
    margin: 40,
    borderRadius: 20,

  },
  containerM: {
    justifyContent: 'center',
    marginTop: 14,
    //marginBottom: 20,
  },

  caption: {
    marginTop: 30,
    
    //fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  /*divider: {
    marginTop: 8,
    marginHorizontal: 16,
  },*/
  scrollView: {
    flex: 1,
    width: '100%',
  },
  itemsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 19,
  },
  colContainer: {
    alignItems: 'center',
  },
  itemContainer: {
    width: 70,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 50,
    marginRight: 5,
    marginLeft: 5,
    backgroundColor: 'yellow',
    padding: 8,
  },
  itemPrice: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  itemIcon: {
    marginTop: 12,
    margin: 10,
  },
  lastCaption: {
    margin: 16,
    textAlign: 'center',
    fontSize: 15
    //fontWeight: 'bold',
  },
});

export default ShopScreen;
