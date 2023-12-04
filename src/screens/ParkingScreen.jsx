import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView, StatusBar, Platform } from "react-native";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
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

  useEffect(() => {
    fetchParkingZones();
  }, []);

  const fetchParkingZones = async () => {
    try {
      const response = await fetch(
        "https://data.calgary.ca/resource/rhkg-vwwp.json"
      );
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
    // 处理标记点击事件
    console.log('Marker pressed', zone);
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
                    onPress={() => handleMarkerPress(zone)} // 添加您想要执行的操作
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
