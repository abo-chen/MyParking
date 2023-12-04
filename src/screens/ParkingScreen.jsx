import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView, StatusBar, Platform } from "react-native";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../../environments";

const ParkingScreen = () => {
  const [region, setRegion] = useState({
    latitude: 51.0646,
    longitude: -114.092,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [startMarker, setStartMarker] = useState(null);
  const [endMarker, setEndMarker] = useState(null);

  const handleSelect = (details, isStart) => {
    const { lat, lng } = details.geometry.location;
    const newRegion = {
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    setRegion(newRegion);

    if (isStart) {
      setStartMarker(newRegion);
    } else {
      setEndMarker(newRegion);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <>
          <View style={styles.Container}>
            <View style={styles.row1}>
              <GooglePlacesAutocomplete
                placeholder="Enter start address"
                fetchDetails
                query={{
                  key: GOOGLE_API_KEY,
                  language: "en",
                }}
                onPress={(data, details = null) => handleSelect(details, true)}
                styles={autocompleteStyles}
              />
            </View>
            <View style={styles.row2}>
              <GooglePlacesAutocomplete
                placeholder="Enter end address"
                fetchDetails
                query={{
                  key: GOOGLE_API_KEY,
                  language: "en",
                }}
                onPress={(data, details = null) => handleSelect(details, false)}
                styles={autocompleteStyles}
              />
            </View>
          </View>
          <MapView style={styles.map} region={region}>
            {startMarker && <Marker coordinate={startMarker} pinColor="blue" />}
            {endMarker && <Marker coordinate={endMarker} pinColor="red" />}
          </MapView>
        </>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  Container: {
    flex: 1,
    width: "70%",
    paddingLeft: 60,
  },
  row1: {
    justifyContent: "center",
    zIndex: 2,
    height: 50,
  },
  row2: {
    flex: 1,
    justifyContent: "center",
    zIndex: 1,
    height: 50,
    
  },
  map: {
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
});

const autocompleteStyles = {
  container: {
    flex: 1,
    position: "absolute",
    top: StatusBar.currentHeight || 0,
    width: "100%",
  },
  textInputContainer: {
    width: "100%",
  },
  textInput: {
    height: 40,
    color: "#5d5d5d",
    fontSize: 16,
  },
  listView: {
    backgroundColor: "white",
  },
};

export default ParkingScreen;
