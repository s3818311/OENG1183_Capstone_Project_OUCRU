import React, { Component } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const hcmc_features = require("../../tempdata/hcmc_feature.json");
const hanoi_features = require("../../tempdata/hanoi_feature.json");

class MyMapContainer extends Component {
	state = { color: "#ffff00" };

	colors = ["green", "blue", "yellow", "orange", "grey"];

	componentDidMount() {
		console.log("Ok");
	}

	wardStyle = {
		fillColor: "red",
		fillOpacity: 1,
		color: "black",
		weight: 2,
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

	onEachWard = (ward, layer) => {
		const wardName = ward.properties.NAME_3;
		// console.log(wardName);
		layer.bindPopup(wardName);

		layer.options.fillOpacity = Math.random(); //0-1 (0.1, 0.2, 0.3)
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
				<h1 style={{ textAlign: "center" }}>My MapContainer</h1>
				<MapContainer
					style={{ height: "80vh", width: "40vw", display: "inline-block" }}
					zoom={9.5}
					center={[10.75, 106.7]}
					minZoom={5}
					maxZoom={15}
					zoomSnap={0.5}
				>
					<GeoJSON style={this.wardStyle} data={hcmc_features.features} onEachFeature={this.onEachWard} />
				</MapContainer>
				<MapContainer
					style={{ height: "80vh", width: "40vw", display: "inline-block" }}
					zoom={9.5}
					center={[21.0, 105.6]}
					minZoom={5}
					maxZoom={15}
					zoomSnap={0.5}
				>
					<GeoJSON style={this.wardStyle} data={hanoi_features.features} onEachFeature={this.onEachWard} />
				</MapContainer>
				<input type="color" value={this.state.color} onChange={this.colorChange} />
			</div>
		);
	}
}

export default MyMapContainer;
