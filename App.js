import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { fetchData } from "./actions";
import MapView from "react-native-maps";
import flagImg from "./assets/mxaU520.png";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE = 32.824539;
const LONGITUDE = -96.674718;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
let id = 0;

const region = {
  latitude: LATITUDE,
  longitude: LONGITUDE,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA
};

class App extends Component {
  componentWillMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
          style={styles.map}
          initialRegion={region}
        >
          {this.props.appData.data.length
            ? this.props.appData.data.map((marker, i) => {
                console.log(marker);
                return (
                  <MapView.Marker
                    key={i}
                    coordinate={{ latitude: marker.lat, longitude: marker.lon }}
                    pinColor={marker.color}
                  />
                );
              })
            : null}
        </MapView>
        {this.props.appData.data.isFetching && (
          <View style={styles.buttonContainer}>
            <Text>Loading</Text>
          </View>
        )}
      </View>
    );
  }
}

App.propTypes = {
  provider: MapView.ProviderPropType
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  bubble: {
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: "stretch"
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  }
});

function mapStateToProps(state) {
  return {
    appData: state.appData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchData: () => dispatch(fetchData())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
