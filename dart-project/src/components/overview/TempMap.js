import React, { Component } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const hcmc_features = require("../../tempdata/hcmc_feature.json");
const hcmc_data = require("../../tempdata/chirps_avg_hcmc_2020.json");
const hanoi_features = require("../../tempdata/hanoi_feature.json");
const hanoi_data = require("../../tempdata/chirps_avg_hanoi_2020.json");

class MyMapContainer extends Component {
  state = { color: "#ffff00" };

  colors = ["green", "blue", "yellow", "orange", "grey"];

  componentDidMount() {
    console.log("Ok");
  }

  wardStyle = {
    fillColor: "blue",
    fillOpacity: 1,
    color: "black",
    weight: 1,
  };

  printMesssageToConsole = (event) => {
    console.log("Clicked");
  };

  changeWardColor = (event) => {
    event.target.setStyle({
      color: "green",
      fillColor: this.state.color,
      fillOpacity: 1,
    });
  };

  onEachWardHCMC = (ward, layer) => {
    const wardName = ward.properties.NAME_3;
    const wardID = ward.properties.ID_3;
    let data = 0;
    // console.log(wardID);
    layer.bindPopup(wardName);

    for (let i = 0; i < hcmc_data.length; i++) {
      const ele = hcmc_data[i];
      if (ele.ID_3 == wardID) data = ele.chirps_avg;
    }

    layer.options.fillOpacity = data; //0-1 (0.1, 0.2, 0.3)
    // const colorIndex = Math.floor(Math.random() * this.colors.length);
    // layer.options.fillColor = this.colors[colorIndex]; //0

    layer.on({
      click: this.changeWardColor,
    });
  };

  onEachWardHN = (ward, layer) => {
    const wardName = ward.properties.NAME_3;
    const wardID = ward.properties.ID_3;
    let data = 0;
    // console.log(wardID);
    layer.bindPopup(wardName);

    for (let i = 0; i < hanoi_data.length; i++) {
      const ele = hanoi_data[i];
      if (ele.ID_3 == wardID) data = ele.chirps_avg;
    }

    layer.options.fillOpacity = data; //0-1 (0.1, 0.2, 0.3)
    // const colorIndex = Math.floor(Math.random() * this.colors.length);
    // layer.options.fillColor = this.colors[colorIndex]; //0

    layer.on({
      click: this.changeWardColor,
    });
  };

  colorChange = (event) => {
    this.setState({ color: event.target.value });
  };

  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}>Choropleth Maps</h1>
        <MapContainer
          style={{ height: "80vh", width: "40vw", display: "inline-block" }}
          zoom={9.5}
          center={[10.75, 106.7]}
          minZoom={5}
          maxZoom={15}
          zoomSnap={0.5}
        >
          <GeoJSON
            style={this.wardStyle}
            data={hcmc_features.features}
            onEachFeature={this.onEachWardHCMC}
          />
        </MapContainer>
        <MapContainer
          style={{ height: "80vh", width: "40vw", display: "inline-block" }}
          zoom={9.5}
          center={[21.0, 105.6]}
          minZoom={5}
          maxZoom={15}
          zoomSnap={0.5}
        >
          <GeoJSON
            style={this.wardStyle}
            data={hanoi_features.features}
            onEachFeature={this.onEachWardHN}
          />
        </MapContainer>
        <input
          type="color"
          value={this.state.color}
          onChange={this.colorChange}
        />
      </div>
    );
  }
}

export default MyMapContainer;
