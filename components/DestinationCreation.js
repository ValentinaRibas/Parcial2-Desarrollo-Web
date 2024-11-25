import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export const DestinationCreation = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null); 
  const [items, setItems] = useState([{ label: "Hard", value: "hard" }, { label: "Medium", value: "medium" }, { label: "Easy", value: "easy" }]); 
  const [newDestination, setNewDestination] = useState({
    name: '',
    description: '',
    difficulty: '',
  });

  const handleAddDestination = async () => {
    try {
      newDestination.difficulty = value ? value : "";
      await fetch('http://161.35.143.238:8000/vribas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDestination),
      });
      setNewDestination({ name: '', description: '', difficulty: '' });
    } catch (error) {
      console.error('Error adding destination:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name..."
        value={newDestination.name}
        onChangeText={(text) => setNewDestination({...newDestination, name: text})}
      />
      <TextInput
        style={styles.input}
        placeholder="Description..."
        value={newDestination.description}
        onChangeText={(text) => setNewDestination({...newDestination, description: text})}
        multiline
      />
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={styles.dropdown}
        placeholder="Difficulty..." 
      />
      <Button title="Add destination" onPress={handleAddDestination} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      width: '85%',
      alignSelf: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      padding: 15,
      marginBottom: 10,
      backgroundColor: 'white',
    },
    dropdown: {
      padding: 10,
      marginBottom: 10,
      borderColor: 'gray',
      borderWidth: 1,
    },
  });