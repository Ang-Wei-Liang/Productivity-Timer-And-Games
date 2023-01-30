import {useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {Stack, Button, IconComponentProvider} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import firebase from "firebase/app";
import {auth} from "../firebase";
import "firebase/auth";
import "firebase/firestore";


function MoneyTrack() {
  const [coins, setCoins] = useState(100);

  function updateCoins(newCoins) {
    docRef.update({coin: newCoins})
  }

  useEffect(() => {
    const collectionRef = firebase.firestore().collection("users");
    const docRef = collectionRef.doc(firebase.auth().currentUser.uid);
    docRef.get().then(doc => {
      if (doc.exists) {
        if (doc.data().coin == undefined){
          setCoins(100);
          updateCoins(100);
        }
        else setCoins(doc.data().coin);
      }
    });
  }, []);
  
  return (
    <Stack spacing={4}>
      <Button
        tintColor="black"
        title={`Coins: ${coins}`}
        color="yellow"
        style={styles.containerG}
        leading={(props) => <Icon name="hand-coin" {...props} />}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  containerG: {
    /*marginTop: 70,   
    marginLeft: -130,
    marginBottom: 40,
    marginRight: 10,*/
    width: 190,
    height: 40,

    borderColor: "black",
    //backgroundColor: 'yellow'
    /*position: 'relative',*/
    /*top: -160,
    left: -40,
    left: -180,
    top: -340,*/
  },
});

export default MoneyTrack;
