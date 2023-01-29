import React, {useEffect, useState} from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Constants from "expo-constants";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {auth} from "../firebase";
import {useNavigation} from "@react-navigation/native";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

function SignUpPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Main");
      }
    });

    return unsubscribe;
  }, []);

  const handleSignUp = async () => {
    const userCredentials = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredentials.user;
    console.log("Registered with:", user.email);

    // Create a reference to the Firestore collection
    const collectionRef = firebase.firestore().collection("users");
    collectionRef
      .add({
        email: user.email,
        coin: 0,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(function () {
        alert("Account successfully created!");
      })
      .catch(function (error) {
        alert.error("Error writing document: ", error);
      });
  };

  const handleLogin = async () => {
    try {
      const userCredentials = await auth.signInWithEmailAndPassword(email, password);
      const user = userCredentials.user;
      console.log("Logged in with:", user.email);

      // Create a reference to the Firestore collection
      const collectionRef = firebase.firestore().collection("users");
      // check if document with user id exists in the collection
      const docRef = collectionRef.doc(user.uid);
      const docSnapshot = await docRef.get();

      if (!docSnapshot.exists) {
        // if the document does not exist, add the user data to the collection
        collectionRef
          .doc(user.uid)
          .set({
            email: user.email,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            alert("User successfully registered!");
          })
          .catch((error) => {
            alert.error("Error writing document: ", error);
          });
      } else {
        alert("Welcome!!");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        console.log("Dismiss");
      }}
    >
      <View style={styles.container}>
        <Icon name="rocket" size={32} color="#900" />

        <Text style={styles.containerTitles}> Email </Text>
        <TextInput
          style={[styles.input, styles.input.one]}
          placeholder="Your email address"
          //value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Text style={styles.containerTitles}> Password </Text>
        <TextInput
          style={[styles.input, styles.input.two]}
          placeholder="Your password"
          //value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />

        <Text style={styles.positionText}>
          {" "}
          ✅ I agree to the<Text style={styles.textStyle}> Terms of Services</Text> and
          <Text style={styles.textStyle}> Private Policy </Text>
        </Text>

        <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={handleSignUp} style={styles.button1}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogin} style={styles.button2}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        </View>
        
      </View>
    </TouchableWithoutFeedback>
  );
}

export default SignUpPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
  },
  containerTitles: {
    position: "relative",
    right: 100,
    marginTop: 15,
  },
  adjustIcon: {
    position: "absolute",
    top: 80,
    left: 40,
  },
  title: {
    fontSize: 24,
    marginBottom: 100,
    marginRight: 190,
    /*position: 'absolute',
    top: 80,
    right: 200,*/
    fontWeight: "bold",
  },
  input: {
    width: "80%",
    padding: 12,
    margin: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ccc",
    one: {
      backgroundColor: "lightgreen",
    },
    two: {
      backgroundColor: "yellow",
    },
  },

  button1: {
    backgroundColor: "green",
    padding: 12,
    marginBottom: 2,
    marginTop: 44,
    marginHorizontal: 21,
    borderRadius: 8,
  },
  button2: {
    backgroundColor: "blue",
    padding: 12,
    marginBottom: 2,
    marginTop: 44,
    marginHorizontal: 26,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  positionText: {
    position: "relative",
    left: -3,
    fontSize: 10,
  },
  textStyle: {
    color: "darkgreen",
    fontWeight: "bold",
  },
});
