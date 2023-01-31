//I repeat this is a clutter free version, I have to speedrun this

import {useEffect, useState} from "react";
import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {Stack, Button, IconComponentProvider} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import firebase from "firebase/app";
import {auth, db} from "../firebase";
import "firebase/auth";
import "firebase/firestore";


const MoneyTrack = () => { 
  const [coinValue, setCoinValue] = useState(101);

  useEffect(() => {

    const userId = auth.currentUser.uid; 
    const coinValueRef = db.collection('users').doc(userId).collection('users').doc('coin');

    coinValueRef.get().then(doc => {
      if (doc.exists) {
        setCoinValue(doc.data().coin);
      } else {
        console.log("Document does not exist");
      }
    });

    coinValueRef.onSnapshot(doc => {
      setCoinValue(doc.data().coin);
    });
  }, [coinValue]);


  const updateCoins = (newCoins) => {
    const collectionRef = firebase.firestore().collection("users");
    const docRef = collectionRef.doc(firebase.auth().currentUser.uid);
    docRef.update({ coin: newCoins });
  }

  
  return (
    
    <Stack spacing={4}>
    
      <Button
        tintColor="black"
        title={`Coins: ${coinValue}`}
        color="yellow"
        style={styles.containerG}
        leading={(props) => <Icon name="hand-coin" {...props} />}
        
      />
      {}
      {console.log("In stack is"+coinValue)}
    </Stack>
  );
};

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