import * as React from 'react';
import { useState, useContext, createContext } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Constants from 'expo-constants';
import { TouchableOpacity, Alert } from 'react-native';
import { useTheme } from 'react-native-paper';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
//import MoneyTrack from './MoneyTrack.js';

import { forwardRef, useRef } from 'react';
import { PracticeProvider,PracticeContext } from '../Global/PracticeContext';


//import {Divider} from '@rneui/themed';

//import { PracticeProvider } from '../Global/PracticeContext';



import MoneyTrack from './MoneyTrack.js';
//const image = { uri: "https://reactjs.org/logo-og.png" };
import { useFonts } from 'expo-font';

//import ImageBg from './imagesBg.js';

const Item = ({ price, color, onPress2, label }) => {
  const [clicked, setClicked] = useState(false);
  return (

    <TouchableOpacity
      style={[styles.itemContainer, { backgroundColor: color }]}
      disabled={clicked}
      onPress={() => {
        onPress2(price, label);
        setClicked(!clicked);
        
      }}
    >

      <Text style={styles.itemPrice} >{price}$</Text>

      {clicked ? (
       <Icon
       style={styles.itemIcon}
       name="check-circle"
       size={28}
       color="white"
       />
      ) : (
        <Icon
        style={styles.itemIcon}
        name="treasure-chest"
        size={30}
        color="white"
      />
      )}


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
        label="Working 24/7"
      />
      <Item
        price="60"
        color="green"
        onPress2={onPress2}
        label="Keep Imagining"
      />
      <Item
        price="80"
        color="violet"
        onPress2={onPress2}
        label="Just Do It"
      />
      <Item
        price="200"
        color="orange"
        onPress2={onPress2}
        label="Dream Big"
      />
      <Item
        price="400"
        color="darkgrey"
        onPress2={onPress2}
        label="I'm Loving It"
      />
    </View>
  );
};

const Col2 = ({ onPress2 }) => {
  return (
    <View style={styles.colContainer}>
      <Item
        price="40"
        color="black"
        onPress2={onPress2}
        label="Think Different"
      />
      <Item
        price="60"
        color="green"
        onPress2={onPress2}
        label="Use your brain"
      />
      <Item
        price="80"
        color="violet"
        onPress2={onPress2}
        label="Start Small"
      />
      <Item
        price="200"
        color="orange"
        onPress2={onPress2}
        label="Just Believe"
      />
      <Item
        price="400"
        color="darkgrey"
        onPress2={onPress2}
        label="Chill and Relax"
      />
    </View>
  );
};


const Col3 = ({ onPress2 }) => {
  return (
    <View style={styles.colContainer}>
      <Item
        price="40"
        color="red"
        onPress2={onPress2}
        label="I Am Me"
      />
      <Item
        price="60"
        color="brown"
        onPress2={onPress2}
        label="Smile More"
      />
      <Item
        price="80"
        color="purple"
        onPress2={onPress2}
        label="Act Now"
      />
      <Item
        price="300"
        color="darkorange"
        onPress2={onPress2}
        label="Be Yourself"
      />
      <Item
        price="800"
        color="black"
        onPress2={onPress2}
        label="I can and I will" //19 chars
      />
    </View>
  );
};

function ShopScreen(props) {
  const { data, setData } = useContext(PracticeContext)
  const DataContext = createContext();
  const [dataRewards, setDataRewards] = useState('default data');
  const [label, setLabel] = useState('None');
  const { colors } = useTheme();
  const [loaded] = useFonts({
    Jelly: require('../assets/Jua-Regular.ttf'),
  });

  const childRef = useRef(null);
  //const childRef = React.createRef();

  if (!loaded) {
    return null;
  }

  const onPress2 = (price, label) => {
    childRef.current.setCoins(prevCount => {
      console.log(prevCount - price);
      return prevCount - price;
    });
    setData(label)
    Alert.alert(label);
    setLabel(label);
    //setDataRewards('new data from FirstPage');
    console.log("ShopData is" + data )
  };

  

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.containerM}>
          <MoneyTrack ref={childRef} />
        </View>
        
        <Text style={[{ fontFamily: 'Jelly' }, styles.caption]}>Greetings, buy stuff here!</Text>

        <ScrollView style={styles.scrollView}>
        <DataContext.Provider value={{ dataRewards, setDataRewards }}>
          <View style={styles.itemsContainer}>
            <Col1 onPress2={onPress2} />
            <Col2 onPress2={onPress2} />
            <Col3 onPress2={onPress2} />
          </View>
        </DataContext.Provider>
        </ScrollView>

        <Text style={[{ fontFamily: 'Jelly' }, styles.lastCaption]}>Last Obtained: {label} </Text>
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
