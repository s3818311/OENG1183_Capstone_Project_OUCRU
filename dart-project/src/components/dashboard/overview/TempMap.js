import { TextField, MenuItem, Grid, Paper, Button } from "@mui/material";
import React, { useState, useRef, useMemo, useEffect } from "react";
import { MapContainer, GeoJSON, TileLayer, useMap } from "react-leaflet";
import { latLngBounds } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./TempMap.css";

const hcmc_features = require("../../../tempdata/hcmc_feature.json");
const hanoi_features = require("../../../tempdata/hanoi_feature.json");
const hcmc_chirps_data = require("../../../tempdata/chirps_avg_hcmc_2020.json");
const hcmc_fake_data = require("./fake/hcmc_fake1.json");
const hanoi_chirps_data = require("../../../tempdata/chirps_avg_hanoi_2020.json");
const hanoi_fake_data = require("./fake/hanoi_fake1.json");

const processData = (data) => {
	const processedData = {};
	const keys = Object.keys(data[0]);
	for (let i = 0; i < data.length; i++) {
		processedData[data[i][keys[0]]] = data[i][keys[1]];
	}
	return processedData;
};

const dataDict = {
	"Chirps 2020": [processData(hcmc_chirps_data), processData(hanoi_chirps_data)],
	"Aphrodite 2020": [processData(hcmc_fake_data), processData(hanoi_fake_data)],
};

const hcmcDict = {};
const hanoiDict = {};

const colors = ["#00ff00", "#ade400", "#f5c000", "#ff8f00", "#ff4625", "#ff0074", "#ff00bc", "#ff02ff"];

const centers = {
	"Hà Nội": [21.0, 105.6],
	"Hồ Chí Minh": [10.75, 106.7],
};

// function SetViewOnClick() {
// 	const map = useMapEvent("click", (e) => {
// 		map.setView(e.latlng, map.getZoom(), {
// 			animate: true,
// 		});
// 	});

// 	return null;
// }

hcmc_features.features.map((feature, index) => {
	if (hcmcDict[feature.properties.NAME_2] == null) {
		hcmcDict[feature.properties.NAME_2] = {};
	}
	hcmcDict[feature.properties.NAME_2][feature.properties.NAME_3] = index;
	return feature.properties.NAME_3;
});

hanoi_features.features.map((feature, index) => {
	if (hanoiDict[feature.properties.NAME_2] == null) {
		hanoiDict[feature.properties.NAME_2] = {};
	}
	hanoiDict[feature.properties.NAME_2][feature.properties.NAME_3] = index;
	return feature.properties.NAME_3;
});

const cities = {
	"Hồ Chí Minh": hcmcDict,
	"Hà Nội": hanoiDict,
};

const SetViewTo = ({ center }) => {
	const map = useMap();
	map.setView(center, 9, {
		animate: true,
	});
	return null;
};

const HCMCMapFunction = ({ dataType, district, ward, setDistrict, setWard, setWardOnHover }) => {
	const map = useMap();

	const getColor = (d, min, max) => {
		const len = colors.length;
		const step = (max - min) / len;
		if (d === max) return colors[len - 1];
		return colors[Math.floor((d - min) / step)];
	};

	const findValue = (data, wardID) => {
		const dataValueKey = Object.keys(data[0])[1];
		for (let i = 0; i < data.length; i++) {
			const ele = data[i];
			if (ele.ID_3 === wardID) return ele[dataValueKey];
		}
	};

	const wardStyle = (feature) => {
		return {
			// fillColor: hanoiDistrictColor[feature.properties.NAME_2],
			fillColor: getColor(dataDict[dataType][0][feature.properties.ID_3], 0, 1),
			weight: 1,
			opacity: 1,
			color: "white",
			dashArray: "3",
			fillOpacity: feature.properties.NAME_2 === district ? 1 : 0.5,
		};
	};

	const selectFeature = (e) => {
		const layer = e.target.feature.properties;
		setWard("");
		setDistrict(layer.NAME_2);
		setWard(layer.NAME_3);
		// map.flyToBounds(e.target.getBounds(), { duration: 0.5 });
		// console.log(e.target.getBounds());
	};

	const highlightFeature = (e) => {
		const { COUNTRY, NAME_1, NAME_2, ID_3, NAME_3 } = e.target.feature.properties;
		setWardOnHover({
			wardID: ID_3,
			ward: NAME_3,
			district: NAME_2,
		});
	};

	const resetHighlight = (e) => {
		e.target.setStyle(wardStyle(e.target.feature));
		setWardOnHover({});
	};

	const onEachWard = (feature, layer) => {
		const wardName = feature.properties.NAME_3;
		const districtName = feature.properties.NAME_2;
		layer.bindTooltip(`${wardName}, ${districtName}`);

		layer.on({
			click: selectFeature,
			mouseover: highlightFeature,
			mouseout: resetHighlight,
		});
	};

	useEffect(() => {
		if (ward !== "" && district !== "") {
			// console.log(district, ward)
			const wrongBounds = latLngBounds(hcmc_features["features"][hcmcDict[district][ward]].geometry.coordinates);
			const swapLatLng = [
				[wrongBounds.getNorthEast().lng, wrongBounds.getNorthEast().lat],
				[wrongBounds.getSouthWest().lng, wrongBounds.getSouthWest().lat],
			];
			const bounds = latLngBounds(swapLatLng);
			map.flyToBounds(bounds, { duration: 0.5 });
		}
	}, [district, ward, map]);

	return <GeoJSON style={wardStyle} data={hcmc_features.features} onEachFeature={onEachWard} />;
};

const HanoiMapFunction = ({ dataType, district, ward, setDistrict, setWard, setWardOnHover }) => {
	const map = useMap();

	const getColor = (d, min, max) => {
		const len = colors.length;
		const step = (max - min) / len;
		if (d === max) return colors[len - 1];
		return colors[Math.floor((d - min) / step)];
	};

	const findValue = (data, wardID) => {
		const dataValueKey = Object.keys(data[0])[1];
		for (let i = 0; i < data.length; i++) {
			const ele = data[i];
			if (ele.ID_3 === wardID) return ele[dataValueKey];
		}
	};

	const wardStyle = (feature) => {
		return {
			// fillColor: hanoiDistrictColor[feature.properties.NAME_2],
			fillColor: getColor(dataDict[dataType][1][feature.properties.ID_3], 0, 1),
			weight: 1,
			opacity: 1,
			color: "white",
			dashArray: "3",
			fillOpacity: feature.properties.NAME_2 === district ? 1 : 0.5,
		};
	};

	const selectFeature = (e) => {
		const layer = e.target.feature.properties;
		setWard("");
		setDistrict(layer.NAME_2);
		setWard(layer.NAME_3);
		// map.flyToBounds(e.target.getBounds(), { duration: 0.5 });
		// console.log(e.target.getBounds());
	};

	const highlightFeature = (e) => {
		const { COUNTRY, NAME_1, NAME_2, ID_3, NAME_3 } = e.target.feature.properties;
		setWardOnHover({
			wardID: ID_3,
			ward: NAME_3,
			district: NAME_2,
		});
	};

	const resetHighlight = (e) => {
		e.target.setStyle(wardStyle(e.target.feature));
		setWardOnHover({});
	};

	const onEachWard = (feature, layer) => {
		const wardName = feature.properties.NAME_3;
		const districtName = feature.properties.NAME_2;
		layer.bindTooltip(`${wardName}, ${districtName}`);

		layer.on({
			click: selectFeature,
			mouseover: highlightFeature,
			mouseout: resetHighlight,
		});
	};

	useEffect(() => {
		if (ward !== "") {
			const wrongBounds = latLngBounds(hanoi_features["features"][hanoiDict[district][ward]].geometry.coordinates);
			const swapLatLng = [
				[wrongBounds.getNorthEast().lng, wrongBounds.getNorthEast().lat],
				[wrongBounds.getSouthWest().lng, wrongBounds.getSouthWest().lat],
			];
			const bounds = latLngBounds(swapLatLng);
			map.flyToBounds(bounds, { duration: 0.5 });
		}
	}, [district, ward, map]);

	return <GeoJSON style={wardStyle} data={hanoi_features.features} onEachFeature={onEachWard} />;
};

const MyMapFinalContainer = (props) => {
	const tileRef = useRef();
	const [wardOnHover, setWardOnHover] = useState({});
	const [city, setCity] = useState("Hồ Chí Minh");
	const [district, setDistrict] = useState("");
	const [ward, setWard] = useState("");
	const [dataType, setDataType] = useState("Chirps 2020");

	const handleCityChange = (e) => {
		setCity(e.target.value);
		setDistrict("");
		setWard("");
	};

	const handleDistrictChange = (e) => {
		setDistrict(e.target.value);
		setWard("");
	};

	const handleWardChange = (e) => {
		setWard(e.target.value);
	};

	const handleDataChange = (e) => {
		setDataType(e.target.value);
	};

	const clearSelection = () => {
		setWard("");
		setDistrict("");
	};

	const createLegend = (min, max) => {
		const len = colors.length;
		const step = (max - min) / len;
		var current = max - step;
		var legendRows = [];

		legendRows.push(
			<div style={{ "--color": colors[len - 1] }} key="legend7">
				{current} - {max}
			</div>
		);
		for (let i = len - 2; i >= 0; i--) {
			legendRows.push(
				<div style={{ "--color": colors[i] }} key={`legend${i}`}>
					{current - step} - {current}
				</div>
			);
			current -= step;
		}
		return legendRows;
	};

	const setOnChangeCity = useMemo(() => <SetViewTo center={centers[city]} />, [city]);

	return (
		<>
			<Grid item xs={props.xs} md={props.md} lg={props.lg * 0.75}>
				<Paper
					sx={{
						p: 2,
						height: "85vh",
					}}
				>
					<div className="panel__map">
						<div className="legend">{createLegend(0, 1)}</div>
						{!wardOnHover.wardID && <div className="hover-info">Hover over an Area</div>}
						{wardOnHover.wardID && (
							<div className="info">
								<strong>
									{wardOnHover.ward}, {wardOnHover.district}
								</strong>
								<span>Value: {dataDict[dataType][city === "Hồ Chí Minh" ? 0 : 1][wardOnHover.wardID]}</span>
							</div>
						)}
						<MapContainer
							style={{ height: "80vh", display: "flex" }}
							zoom={9.5}
							center={centers["Hồ Chí Minh"]}
							minZoom={5}
							maxZoom={17}
							zoomSnap={0.25}
						>
							<TileLayer
								attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
								url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
								ref={tileRef}
							/>
							{/* <SetViewOnClick /> */}
							{setOnChangeCity}
							{city === "Hồ Chí Minh" ? (
								<HCMCMapFunction
									dataType={dataType}
									district={district}
									ward={ward}
									setDistrict={setDistrict}
									setWard={setWard}
									setWardOnHover={setWardOnHover}
								/>
							) : (
								<HanoiMapFunction
									dataType={dataType}
									district={district}
									ward={ward}
									setDistrict={setDistrict}
									setWard={setWard}
									setWardOnHover={setWardOnHover}
								/>
							)}
						</MapContainer>
					</div>
				</Paper>
			</Grid>
			<Grid item xs={props.xs} md={props.md} lg={props.lg * 0.25}>
				<Paper
					sx={{
						p: 2,
						height: "85vh",
					}}
				>
					<Grid container spacing={2}>
						<Grid item xs={props.xs} md={props.md * 0.28} lg={props.lg}>
							<TextField
								fullWidth
								id="city_select"
								select
								label="Cities"
								value={city}
								onChange={handleCityChange}
								helperText="Please select your city"
							>
								{Object.keys(cities).map((city) => (
									<MenuItem key={city} value={city}>
										{city}
									</MenuItem>
								))}
							</TextField>
						</Grid>
						<Grid item xs={props.xs} md={props.md * 0.28} lg={props.lg}>
							{city && (
								<TextField
									fullWidth
									id="district_select"
									select
									label="Districts"
									value={district}
									onChange={handleDistrictChange}
									helperText="Please select your district"
								>
									{Object.keys(cities[city]).map((district) => (
										<MenuItem key={district} value={district}>
											{district}
										</MenuItem>
									))}
								</TextField>
							)}
						</Grid>
						<Grid item xs={props.xs} md={props.md * 0.28} lg={props.lg}>
							{district && (
								<TextField
									fullWidth
									id="ward_select"
									select
									label="Wards"
									value={ward}
									onChange={handleWardChange}
									helperText="Please select your ward"
								>
									{Object.keys(cities[city][district]).map((ward) => (
										<MenuItem key={ward} value={ward}>
											{ward}
										</MenuItem>
									))}
								</TextField>
							)}
						</Grid>
						<Grid item xs={props.xs} md={props.md * 0.16} lg={props.lg}>
							<Button variant="contained" fullWidth onClick={clearSelection}>
								Clear
							</Button>
						</Grid>
						<Grid item xs={props.xs} md={props.md} lg={props.lg}>
							<TextField
								fullWidth
								id="data_select"
								select
								label="Data Types"
								value={dataType}
								onChange={handleDataChange}
								helperText="Please select your data type"
							>
								{Object.keys(dataDict).map((dataType) => (
									<MenuItem key={dataType} value={dataType}>
										{dataType}
									</MenuItem>
								))}
							</TextField>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</>
	);
};
export default MyMapFinalContainer;
