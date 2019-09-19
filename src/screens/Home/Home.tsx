import Constants from 'expo-constants';
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import React, { Component } from "react";
import MapView, { Marker } from "react-native-maps";

import Loading from "../../shared/Loading/Loading";
import Button, { EButtonType } from "../../shared/ButtonBackground/ButtonBackground";
import { ContainerCenterView } from "../../shared/ContainerCenter/ContainerCenter.style";
import { ContainerAbsoluteBottomView } from "../../shared/ContainerAbsoluteBottom/ContainerAbsoluteBottom.style";
import { HomeView } from "./Home.style";

interface IHome {
  screenProps: any;
}

class Home extends Component<IHome> {
  state = {
    mapRegion: null,
    msgError: null,
    location: {coords: { latitude: 37.78825, longitude: -122.4324}},
    locations: [],
  };

  async componentDidMount() {
    const location = await this._getLocationAsync();
    await this._getLocationsNearbyAsync(location);
    const mapRegion = { 
      latitude: location.coords.latitude, 
      longitude: location.coords.longitude, 
      latitudeDelta: 0.0922, 
      longitudeDelta: 0.0421,
    };
    this.setState({ location, mapRegion });
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        msgError: "Permissão negada!",
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    return location;
  };

  _getLocationsNearbyAsync = async (location) => {
    const token = Constants.manifest.extra.googletoken;
    const { latitude, longitude } = location.coords;
    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=500&type=restaurant&key=${token}`;
  
    const response = await fetch(url);
    const json = await response.json();

    this.setState({ locations: json.results });
  }

  render() {
    if (this.state.msgError) {
      return (
        <ContainerCenterView>
          {this.state.msgError}
        </ContainerCenterView>
      )
    }

    const { onLogout } = this.props.screenProps;
    return this.state.mapRegion ? (
      <HomeView>
        <MapView
          style={{ flex: 1 }}
          initialRegion={{ 
            latitude: this.state.mapRegion.latitude, 
            longitude: this.state.mapRegion.longitude, 
            latitudeDelta: this.state.mapRegion.latitudeDelta, 
            longitudeDelta: this.state.mapRegion.longitudeDelta, 
          }}
          onRegionChange={this._handleMapRegionChange}
        >
          <Marker
            coordinate={this.state.location.coords}
            title="Minha posição"
            description="Minha posição atual"
            image={require("../../../assets/marker.png")}
          />
          {this.state.locations.map((l) => {
            // console.log(l)
            return (
              <Marker
                key={l.id}
                coordinate={{
                  longitude: l.geometry.location.lng,
                  latitude: l.geometry.location.lat,
                }}
                title={l.name}
                description={l.vicinity}
              />
            );
          })}
        </MapView>
        <ContainerAbsoluteBottomView>
          <Button
            type={EButtonType.default}
            title="Sair"
            onPress={onLogout}
          />
        </ContainerAbsoluteBottomView>
      </HomeView>
    ) : <Loading />;
  }
}

export default Home;