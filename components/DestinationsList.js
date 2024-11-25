import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Platform} from 'react-native';

export const DestinationsList = ({ navigation }) => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchDestinations();
    });

    return unsubscribe;
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await fetch('http://161.35.143.238:8000/vribas');
      const data = await response.json();
      setDestinations(data);
    } catch (error) {
      console.error('Error fetching destinations:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://161.35.143.238:8000/vribas/${id}`, {
        method: 'DELETE',
      });
      fetchDestinations();
    } catch (error) {
      console.error('Error deleting destination:', error);
    }
  };

  const handleChangeFavourite = async (itemId, itemFavourite) => {
    try {
      await fetch(`http://161.35.143.238:8000/vribas/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"favourite": !itemFavourite}),
      });
      fetchDestinations();

    } catch (error) {
      console.error('Error adding destination:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.destination}
      onPress={() => navigation.navigate('DestinationDetails', { id: item.id })}
    >
      <TouchableOpacity style={styles.favourite}
      onPress={() => handleChangeFavourite(item.id, item.favourite)}
      >
      {Platform.select({
        ios: (
          item.favourite ? <Text style={styles.favourite}>🩷</Text> :
        <Text style={styles.favourite}>♡</Text>
        ),
        android: (
          item.favourite ? <Text style={styles.favourite}>★</Text> :
        <Text style={styles.noFavourite}>⭐</Text>
        )
      })}
      </TouchableOpacity>
      <Text style={styles.name}>{item.name}</Text>
      {item.difficulty === "hard" ?  <View style={styles.tagHard} /> :
      (item.difficulty === "medium" ? <View style={styles.tagMedium} /> :
        <View style={styles.tagEasy} /> 
      )}
      
      <TouchableOpacity
        onPress={() => handleDelete(item.id)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={destinations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
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
  destination: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
  },
  name: {
    fontSize: 18,
    marginRight: 15,
  },
  tagHard: {
    backgroundColor: 'red',
    borderRadius: 8,
    padding: 8,
    marginRight: 10,
  },
  tagMedium: {
    backgroundColor: 'yellow',
    borderRadius: 8,
    padding: 8,
    marginRight: 10,
  },
  tagEasy: {
    backgroundColor: 'violet',
    borderRadius: 8,
    padding: 8,
    marginRight: 10,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 5,
    borderColor: 'gray',
    backgroundColor: 'white',
  },
  deleteButtonText: {
    color: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  favourite: {
    padding: 10,
  },
});