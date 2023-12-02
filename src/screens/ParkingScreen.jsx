import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, FlatList, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView, StatusBar, Platform } from "react-native";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

const ParkingScreen = () => {
  // Mock data for parking spots
  const [parkingSpots, setParkingSpots] = useState([
    { id: "1", name: "Spot 1", latitude: 51.0447, longitude: -114.0719 },
    { id: "2", name: "Spot 2", latitude: 51.045, longitude: -114.072 },
    { id: "3", name: "Spot 3", latitude: 51.0453, longitude: -114.0721 },
    { id: "4", name: "Spot 4", latitude: 51.0456, longitude: -114.0722 },
    { id: "5", name: "Spot 5", latitude: 51.05, longitude: -114.08 },
  ]);

  // useEffect(() => {
  //   fetch("https://data.calgary.ca/resource/rhkg-vwwp.json")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setParkingSpots(data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching parking data: ", error);
  //     });
  // }, []);

// State for search query
  const [searchQuery, setSearchQuery] = useState("");

  // Filter parking spots based on search query
  const filteredSpots = parkingSpots.filter(
    (spot) =>
      typeof spot.name === "string" &&
      spot.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 渲染每个停车点作为列表项
  const renderListItem = ({ item }) => (
    <Text onPress={() => focusOnMarker(item.latitude, item.longitude)}>
      {item.name}
    </Text>
  );

  // Function to focus on marker when a list item is clicked
  const focusOnMarker = (latitude, longitude) => {
    // Logic to focus map on selected marker
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 51.0447,
              longitude: -114.0719,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {parkingSpots.map((spot, index) => {
              // 确保经纬度值存在且能转换为有效数字
              const latitude = parseFloat(spot.latitude);
              const longitude = parseFloat(spot.longitude);
              if (!isNaN(latitude) && !isNaN(longitude)) {
                return (
                  <Marker
                    key={index}
                    coordinate={{ latitude, longitude }}
                    title={spot.name}
                  />
                );
              }
              return null; // 如果经纬度不合法，不渲染该标记
            })}
          </MapView>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Parking..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <FlatList
            data={filteredSpots}
            renderItem={renderListItem}
            keyExtractor={(item) => item.id}
            style={styles.list}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchInput: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    zIndex: 1,
  },
  list: {
    position: "absolute",
    top: 50,
    left: 10,
    right: 10,
    backgroundColor: "white",
    zIndex: 1,
  },
});

export default ParkingScreen;
