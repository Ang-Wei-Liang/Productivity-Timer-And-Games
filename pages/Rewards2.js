import * as React from 'react';
import Constants from 'expo-constants';
import {
  Text,
  View,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
  SafeAreaView,
  FlatList
  
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';





const DATA = [
  {
    title: 'Favourites',
    data: ['Chan CC ', 'Clement Lee', 'Candy Lim', 'Ben Tan', 'Bee Hui', 'Ben Tan', 'Bee Hui', 'Ben Tan', 'Bee Hui', 'Ben Tan', 'Bee Hui', 'Ben Tan', 'Bee Hui', 'Ben Tan', 'Bee Hui', 'Ben Tan', 'Bee Hui'],
  },
  {
    title: 'Others',
    data: ['Ben Tan', 'Bee Hui', 'Ben Tan', 'Bee Hui', 'Ben Tan', 'Bee Hui'],
  },
 
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>


  </View>
);

function stateChange(props){
  this.state.check === false ? this.setState({logo:'star', check:true}) : this.setState({logo:'star-o', check:false})
}


function Rewards2Screen(props) {
const [people, setPeople] = useState([
  {name: 'Mary', id: '1'},
  {name: 'john', id: '2'},
  {name: 'James', id: '3'},
  {name: 'Jamie', id: '4'},
  {name: 'Susan', id: '5'},
  {name: 'Bob', id: '6'},
])

const pressHandler = (id) => {
  setPeople((prevPeople) => {
    return prevPeople.fliter(person => person.id != id)
  })
  
}

  return (

    <View style={styles.container}>
    <UselessTextInput/>

    <FlatList
    keyExtractor={(item) => item.id}
    data={people}
    renderItem={({ item }) => (
      <TouchableOpacity onPress={() => pressHandler(item.id)}>

    <Text style={styles.item}>{item.name}</Text>
</TouchableOpacity>

    )}
    />

    {/*<ScrollView>
    { people.map(item => (
         <View key={item.key}>
        <Text style={styles.item}>{item.name}</Text>
        </View>
       
  ))}
                  
    </ScrollView> */}
    </View>
        
  );
}


const UselessTextInput = () => {
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState(null);

  return (
    <SafeAreaView>
      
      <TextInput
      multiline
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Search for a collectable!"
        keyboardType="numeric"
      />
    </SafeAreaView>
  );
};






const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
    //alignItems: 'center'
  },
  container1: {
    //flexDirection: 'row',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    border: '2px solid green',
  },
  header: {
    fontSize: 17,
    backgroundColor: 'purple',
    color: 'white',
    padding: 10,
    margin: 5
  },
  item: {
    marginTop: 25,
    padding: 30,
    backgroundColor: 'pink',
    fontSize: 24
  },
  title: {
    fontSize: 15,
  },
  check: {
    position: 'absolute',
    right: 5,
    margin: 5,
    left: 250,
  },
});



export default Rewards2Screen;