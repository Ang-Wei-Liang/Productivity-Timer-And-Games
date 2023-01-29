import * as React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { useFonts } from 'expo-font';

function GamesScreen() {
  const navigation = useNavigation();

  const [loaded] = useFonts({
    Brush: require('../assets/PermanentMarker-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.outercontainer}>
      <Text style={[{ fontFamily: 'Brush' }, styles.styleTitle]}>
        Game Menu
      </Text>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('SnakeGame')}>
          <Image
            source={require('../assets/snakeGame.png')}
            style={styles.image}
          />
          <Text style={styles.text1}>Snake Game🐍</Text>
        </TouchableOpacity>
        

        <TouchableOpacity onPress={() => navigation.navigate('TicTacToe')}>
          <Image
            source={require('../assets/TicTacToe.png')}
            style={styles.image}
          />
          <Text style={styles.text2}>Tic Tac Toe🎯</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  text1:{
    marginLeft:33,
    fontFamily: 'Brush'
  },
  text2:{
    marginLeft: 36,
    fontFamily: 'Brush'
  },
  styleTitle: {
    marginTop: 80,
    fontSize: 25,
    //fontWeight: 'bold',
    //fontFamily: 'Brush'
  },
  outercontainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    //backgroundColor: '#3EB489'
  },
  container: {
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 150,
    height: 150,
    margin: 15
  },
};

export default GamesScreen;
