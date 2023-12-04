import React, { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, StatusBar, Platform } from "react-native";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Input, Button } from "@ui-kitten/components";
import * as Location from "expo-location";
import Autocomplete from 'react-native-autocomplete-input';

const ParkingScreen = () => {
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [region, setRegion] = useState({
    // SAIT Coordinates
    latitude: 51.0646, // Replace with SAIT latitude
    longitude: -114.092, // Replace with SAIT longitude
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [marker, setMarker] = useState(null);

  const GOOGLE_API_KEY = "AIzaSyBr1m5osWiXLUHXXP5fL5n0_K2oKkWfdPI";

  const onSearch = async () => {
    try {
      console.log(address);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      console.log(data);

      if (data.status === "OK") {
        const { lat, lng } = data.results[0].geometry.location;
        setRegion({
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        setMarker({
          latitude: lat,
          longitude: lng,
        });
      } else {
        console.log("Geocoding failed: ", data.status);
      }
    } catch (error) {
      console.log("Error during geocoding: ", error);
    }
  };

  // Function to fetch suggestions based on user input
  const fetchSuggestions = async (text) => {
    if (text.length > 0) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
            text
          )}&key=${GOOGLE_API_KEY}`
        );
        const data = await response.json();
        console.log(data);
        if (data.status === "OK") {
          const suggestions = data.predictions.map(item => item.description);
          setSuggestions(suggestions);
        } else {
          console.log("Failed to fetch suggestions:", data.status);
        }
      } catch (error) {
        console.log("Error fetching suggestions:", error);
      }
    }
  };

  // Handle suggestion selection
  const onSuggestionSelect = (suggestion) => {
    setAddress(suggestion);
    // Logic to update region based on the selected suggestion
    // Update marker position
  };
  
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
    })();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
        <View style={styles.searchRow}>
            <Input
              placeholder="Enter an address"
              value={address}
              onChangeText={(text) => {
                setAddress(text);
                fetchSuggestions(text);
              }}
              style={styles.input}
            />
            <Button onPress={onSearch}>Search</Button>
          </View>
          <View style={styles.autocompleteContainer}>
            <Autocomplete
              data={suggestions}
              defaultValue={address}
              onChangeText={(text) => {
                setAddress(text);
                fetchSuggestions(text);}}
              renderItem={({ item, i }) => (
                <TouchableOpacity key={i} onPress={() => onSuggestionSelect(item)}>
                  <Text style={styles.suggestionItem}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
          {region && (
            <MapView style={styles.map} region={region}>
              {marker && <Marker coordinate={marker} pinColor="blue" />}
            </MapView>
          )}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    margin: 12,
  },
  map: {
    flex: 1,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 12,
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  },
  suggestionItem: {
    backgroundColor: 'white',
    padding: 10,
    fontSize: 18,
    borderWidth: 0.5,
    borderColor: '#ccc'
  },
});

export default ParkingScreen;
