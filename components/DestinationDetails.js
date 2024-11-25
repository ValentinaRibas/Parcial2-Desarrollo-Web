import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export const DestinationDetails = ({ route }) => {
  const { id } = route.params;
  const [destination, setDestination] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedDestination, setEditedDestination] = useState(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null); 
  const [items, setItems] = useState([{ label: "Hard", value: "hard" }, { label: "Medium", value: "medium" }, { label: "Easy", value: "easy" }]); 

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const fetchDetails = async () => {
    try {
      const response = await fetch(`http://161.35.143.238:8000/vribas/${id}`);
      const data = await response.json();
      setDestination(data);
      setEditedDestination(data);
    } catch (error) {
      console.error('Error fetching destination details:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      editedDestination.difficulty = value ? value : "";
      await fetch(`http://161.35.143.238:8000/vribas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedDestination),
      });
      fetchDetails();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating destination:', error);
    }
  };

  if (!destination) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
        {!isEditing ? (
            <>
            <Text style={styles.title}>{destination.name}</Text>
            <Text style={styles.description}>{destination.description}</Text>
            <Text style={styles.description}>Difficulty: {destination.difficulty}</Text>
            <View style={styles.buttonEdit}>
            <Button 
                title="Edit" 
                onPress={() => setIsEditing(true)} 
                />
            </View>
        
            </>
        ) : (
            <>
            <TextInput
                style={styles.input}
                value={editedDestination.name}
                onChangeText={(text) => setEditedDestination({...editedDestination, name: text})}
            />
            <TextInput
                style={styles.input}
                value={editedDestination.description}
                onChangeText={(text) => setEditedDestination({...editedDestination, description: text})}
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
            <Button title="Save" onPress={handleUpdate} />
            <Button title="Cancel" onPress={() => setIsEditing(false)} />
            </>
        )}
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
    deleteButton: {
      backgroundColor: 'red',
      padding: 8,
      borderRadius: 5,
    },
    deleteButtonText: {
      color: 'white',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    description: {
      fontSize: 16,
      marginBottom: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      padding: 15,
      marginBottom: 10,
      backgroundColor: 'white',
    },
    buttonEdit: {
        width: '100%',
        height: 40,
        marginTop: 10,
        marginBottom: 20
    },
    dropdown: {
      marginBottom: 15,
      borderColor: 'gray',
      borderWidth: 1,
    },
  });