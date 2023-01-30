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
import { TouchableOpacity } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
//import MoneyTrack from './MoneyTrack.js';

import { forwardRef, useRef } from 'react';

//import {Divider} from '@rneui/themed';





import MoneyTrack from './MoneyTrack.js';
//const image = { uri: "https://reactjs.org/logo-og.png" };
import { useFonts } from 'expo-font';

//import ImageBg from './imagesBg.js';

const Item = ({ price, color, onPress2 }) => {
  return (

    <TouchableOpacity

      style={[styles.itemContainer, { backgroundColor: color }]}
      onPress={() => onPress2(price)}

    >

      <Text style={styles.itemPrice} >{price}$</Text>
      <Icon

        style={styles.itemIcon}
        name="treasure-chest"
        size={20}
        color="white"
      />

    </TouchableOpacity>

  );
};

const Col1 = ({ onPress2 }) => {
  return (
    <View style={styles.colContainer}>
      <Item
        price="40"
        color="black"
        onPress2={onPress2}
      />
      <Item
        price="60"
        color="green"
        onPress2={onPress2}
      />
      <Item
        price="80"
        color="violet"
        onPress2={onPress2}
      />
      <Item
        price="200"
        color="orange"
        onPress2={onPress2}
      />
      <Item
        price="400"
        color="darkgrey"
        onPress2={onPress2}
      />
    </View>
  );
};

const Col2 = ({ onPress2 }) => {
  return (
    <View style={styles.colContainer}>

      <Item
        price="1"
        color="red"
        onPress={onPress2}
      />

      <Item
        price="60"
        color="brown"
        onPress={onPress2}
      />
      <Item
        price="80"
        color="purple"
        onPress={onPress2}
      />
      <Item
        price="300"
        color="darkorange"
        onPress={onPress2}
      />
      <Item
        price="800"
        color="black"
        onPress={onPress2}
      />
    </View>
  );
};

function ShopScreen(props) {
  const { colors } = useTheme();
  const [loaded] = useFonts({
    Jelly: require('../assets/Jua-Regular.ttf'),
  });

  const childRef = useRef(null);
  //const childRef = React.createRef();

  if (!loaded) {
    return null;
  }

  /*const onPress2 = (price) => {
    console.log(price);
    //console.log(childRef.current.setState)
    //childRef.current.setState((state) => ({ setCoins: state.coins = state.coins - price }));
    if (childRef.current) childRef.current.setState(prevState => ({ count: prevState.count + price }));
  }*/

  /*const onPress2 = (price) => {
    childRef.current.setCoins(prevCount => prevCount +1);
    
  };*/

  const onPress2 = (price) => {
    childRef.current.setCoins(prevCount => {
    console.log(prevCount - price);
    return prevCount - price;
    });
    };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.containerM}>
          <MoneyTrack ref={childRef} />
        </View>

        <Text style={[{ fontFamily: 'Jelly' }, styles.caption]}>Greetings, buy stuff here!</Text>

        <ScrollView style={styles.scrollView}>
          <View style={styles.itemsContainer}>
            <Col1 onPress2={onPress2} />
            <Col1 onPress2={onPress2} />
            <Col2 onPress2={onPress2} />
          </View>
        </ScrollView>

        <Text style={[{ fontFamily: 'Jelly' }, styles.lastCaption]}>Last Obtained: Sergeant</Text>
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
