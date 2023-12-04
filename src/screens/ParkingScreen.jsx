import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { SafeAreaView, StatusBar, Platform } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Modal, Card, Button, Input, Text } from "@ui-kitten/components";
import { GOOGLE_API_KEY } from "../../environments";


const ParkingScreen = () => {
  const [region, setRegion] = useState({
    latitude: 51.0646,
    longitude: -114.092,
    latitudeDelta: 0.05,
    longitudeDelta: 0.025,
  });
  const [startMarker, setStartMarker] = useState(null);
  const [endMarker, setEndMarker] = useState(null);

  const [parkingZones, setParkingZones] = useState([]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedZone, setSelectedZone] = useState(null);
  const [destinationName, setDestinationName] = useState("");
  const [isRouteButtonEnabled, setRouteButtonEnabled] = useState(false);

  useEffect(() => {
    fetchParkingZones();
  }, []);

  const fetchParkingZones = async () => {
    try {
      const response = await fetch("https://data.calgary.ca/resource/rhkg-vwwp.json");
      const data = await response.json();
      setParkingZones(data);
    } catch (error) {
      console.error("Failed to fetch parking zones:", error);
    }
  };

  const handleSelect = (details, isStart) => {
    const { lat, lng } = details.geometry.location;
    const newRegion = {
      ...region,
      latitude: lat,
      longitude: lng,
    };
    setRegion(newRegion);

    if (isStart) {
      setStartMarker(newRegion);
    } else {
      setEndMarker(newRegion);
    }
  };

  const handleMarkerPress = (zone) => {
    setSelectedZone(zone);
    setModalVisible(true);
  };

  const getEndAddressFromZone = (zone) => {
    return zone.address_desc; // Or any other field you consider as an address
  };

  const handleConfirmEndLocation = () => {
    setModalVisible(false);
    if (selectedZone) {
      const endAddress = getEndAddressFromZone(selectedZone);
      setDestinationName(endAddress);
      setRouteButtonEnabled(true);
    }
  };

  const showNavigationRoute = () => {
    // Logic to display the route
    // This could involve using a MapViewDirections component or similar approach
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <>
          <Modal
            visible={isModalVisible}
            backdropStyle={styles.backdrop}
            onBackdropPress={() => setModalVisible(false)}
          >
            <Card disabled={true} style={dialogStyles.card}>
              <Text>Set this as your destination?</Text>
              <Button onPress={handleConfirmEndLocation} size='small' style={dialogStyles.button}>Yes</Button>
              <Button onPress={() => setModalVisible(false)} size='small' style={dialogStyles.button}>No</Button>
            </Card>
          </Modal>
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
              <Input 
                placeholder="Select a Parking Zone"
                value={destinationName}
                disabled={true}
                style={styles.input}
              />
              <Button
                onPress={showNavigationRoute}
                disabled={!isRouteButtonEnabled}
                style={styles.routeButton}
                size='small'
              >
                Nav
              </Button>
            </View>
          </View>
          <MapView style={styles.map} region={region}>
            {startMarker && <Marker coordinate={startMarker} pinColor="blue" />}
            {endMarker && <Marker coordinate={endMarker} pinColor="red" />}
            {parkingZones.map((zone, index) => {
              const coordinates = zone.line.coordinates[0].map((coord) => ({
                latitude: coord[1],
                longitude: coord[0],
              }));

              return (
                <React.Fragment key={index}>
                  <Polyline
                    coordinates={coordinates}
                    strokeColor="green"
                    strokeWidth={2}
                  />
                  <Marker
                    coordinate={{
                      latitude: coordinates[0].latitude,
                      longitude: coordinates[0].longitude,
                    }}
                    pinColor="orange"
                    onPress={() => handleMarkerPress(zone)}
                  />
                </React.Fragment>
              );
            })}
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
    paddingHorizontal: "5%",
  },
  row1: {
    justifyContent: "center",
    zIndex: 2,
    height: 70,
    marginTop: 10,
    // borderWidth: 2,
    // borderColor: "#bfb",
  },
  row2: {
    flexDirection: "row",
    zIndex: 1,
    height: 40,
    // borderWidth: 2,
    // borderColor: "#fbb",
  },
  input: {
    flex: 70,
    marginRight: 10,
  },
  routeButton: {
    flex: 20,
    // Add styles for the button as per your design

  },
  map: {
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

const dialogStyles = StyleSheet.create({
  card: {
    padding: 12,
  },
  button: {
    marginTop: 12,
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
