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
} from 'react-native';
import Constants from 'expo-constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Button } from '@react-native-material/core';
import { Stack, TextInput } from '@react-native-material/core';

//import { useFonts } from 'expo-font';

function generateColor() {
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += Math.floor(Math.random() * 10);
    }
    return color;
}

const Item = ({ name, onPress, isSelected, onFavoritePress, navigation }) => {
    const [focused, setFocused] = useState(isSelected);
    const style = styles.normal;

    const handlePress = () => {
        setFocused(!focused);
        onFavoritePress();
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

const TextInputTop = ({ setSearch }) => {
    const [text, onChangeText] = React.useState('');

    return (
        <SafeAreaView>
            <Stack spacing={2} style={styles.input}>
                <TextInput
                    maxLength={15}
                    label="Search"
                    variant="outlined"
                    placeholder="Search"
                    onChangeText={text => {
                        onChangeText(text);
                        setSearch(text);
                    }}
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
        { id: '10', name: 'John', isFavorite: false }
    ]);
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState(new Map());
    

    const onPress = id => {
        const newSelected = new Map(selected);
        newSelected.set(id, !selected.get(id));
        setSelected(newSelected);
    };

    const onFavoritePress = id => {
        const newItems = [...items];
        const index = newItems.findIndex(item => item.id === id);
        newItems[index].isFavorite = !newItems[index].isFavorite;
        setItems(newItems);
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <TextInputTop setSearch={setSearch} />
                <FlatList
                    data={filteredItems}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Item
                            name={item.name}
                            onPress={() => onPress(item.id)}
                            isSelected={!!selected.get(item.id)}
                            onFavoritePress={() => onFavoritePress(item.id)}
                        />
                    )}
                />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        backgroundColor: generateColor()
    },
    normal: {
        padding: 10,
        fontSize: 18,
        height: 44,
        fontFamily: 'OpenSans-Regular'
    },
    selected: {
        backgroundColor: '#6e3b6e',
        color: 'white'
    },
    starContainer: {
        marginLeft: 'auto',
        marginRight: 10
    },
    input: {
        padding: 10
    }
});

export default Rewards3Screen;