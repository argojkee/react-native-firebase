import { Image, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default MapScreen = ({ route }) => {
  const { latitude, longitude } = route.params.post.location;
  const { photo } = route.params;
  const { photoTitle } = route.params;
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker
          title={photoTitle}
          coordinate={{
            latitude,
            longitude,
          }}
        >
          <Image style={{ width: 40, height: 40 }} source={{ uri: photo }} />
        </Marker>
      </MapView>
    </View>
  );
};
