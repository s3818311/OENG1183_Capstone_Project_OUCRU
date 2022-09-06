import React, { useState } from "react";
import moment from "moment";
import {
  Box,
  Toolbar,
  Select,
  MenuItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  TextField,
  Button,
  LinearProgress,
  Grid,
  Typography,
  Link,
} from "@mui/material";

import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

// json data
import tableEmpty from "../../tempdata/query_builder_table_empty";
import districtsWards from "../../tempdata/districts_wards";
import wardIds from "../../tempdata/wards_id3";

const WardSelect = (props) => {
  const districts = Object.keys(districtsWards);

  const handleChange = (e) => {
    if (e.target.checked) {
      props.wardSetter([...props.wards, e.target.id]);
    } else {
      props.wardSetter(props.wards.filter((w) => w !== e.target.id));
    }
  };

  return (
    <div>
      {districts.map((d, d_idx) => {
        if (props.selectedDistricts.indexOf(d) !== -1)
          return (
            <FormGroup row={true} key={d_idx}>
              <div
                style={{
                  height: "50px",
                  lineHeight: "50px",
                  marginRight: "10px",
                  fontWeight: "bold",
                }}
              >
                {d}:
              </div>
              {districtsWards[d].map((ward, w_idx) => {
                let k = Object.keys(ward);
                return (
                  <FormControlLabel
                    key={w_idx}
                    control={
                      <Checkbox
                        name="wards"
                        onChange={handleChange}
                        id={k[0]}
                      />
                    }
                    label={ward[k[0]]}
                  />
                );
              })}
            </FormGroup>
          );
        else return <div key={d_idx}></div>;
      })}
    </div>
  );
};

const MultiSelect = (props) => {
  const districts = Object.keys(districtsWards);

  const [multiSelected, setMultiSelected] = useState([]);
  let isAllSelected =
    districts.length > 0 && multiSelected.length === districts.length;

  const multiselectChange = (e) => {
    const value = e.target.value;
    if (value[value.length - 1] === "all") {
      setMultiSelected(
        multiSelected.length === districts.length ? [] : districts
      );
      props.selectedDistrictsSetter(
        props.selectedDistricts.length === districts.length ? [] : districts
      );
      return;
    }
    setMultiSelected(value);
    props.selectedDistrictsSetter(value);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const menuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center",
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "center",
    },
    variant: "menu",
  };

  return (
    <FormControl
      fullWidth
      sx={{
        marginTop: "15px",
      }}
    >
      <InputLabel id="multiselect-id">District(s)</InputLabel>
      <Select
        labelId="multiselect-id"
        id="multiselect-id"
        label="District(s)"
        multiple
        value={multiSelected}
        onChange={multiselectChange}
        renderValue={(multiSelected) => multiSelected.join(", ")}
        MenuProps={menuProps}
      >
        <MenuItem value="all">
          <ListItemIcon>
            <Checkbox
              checked={isAllSelected}
              indeterminate={
                multiSelected.length > 0 &&
                multiSelected.length < districts.length
              }
            />
          </ListItemIcon>
          <ListItemText
            primary="Select All"
            primaryTypographyProps={{ fontWeight: "bold" }}
          />
        </MenuItem>
        {districts.map((d, d_idx) => (
          <MenuItem key={d_idx} value={d}>
            <ListItemIcon>
              <Checkbox checked={multiSelected.indexOf(d) > -1} />
            </ListItemIcon>
            <ListItemText primary={d} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

const DataSourceSelect = (props) => {
  return (
    <FormControl
      fullWidth
      sx={{
        marginTop: "15px",
      }}
    >
      <InputLabel id="datasource_id">Data source</InputLabel>
      <Select
        labelId="datasource_id"
        id="datasource_id"
        value={props.datasource}
        label="Data source"
        onChange={(e) => {
          props.dataSourceSetter(e.target.value);
        }}
      >
        <MenuItem value={"chirps"}>CHIRPS - Rainfall Estimates</MenuItem>
        <MenuItem value={"aphrodite_temperature"}>
          APHRODITE - Daily Mean Temperature
        </MenuItem>
      </Select>
    </FormControl>
  );
};

const DatePicker = (props) => {
  return (
    <FormControl
      sx={{
        marginTop: "15px",
      }}
    >
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DesktopDatePicker
          label={props.label}
          inputFormat="DD/MM/YYYY"
          value={props.startDate}
          minDate={props.avaiDateRange[props.datasource][0]}
          maxDate={props.avaiDateRange[props.datasource][1]}
          onChange={(newValue) => {
            props.startDateSetter(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
    </FormControl>
  );
};

const SortOrderSelect = (props) => {
  return (
    <FormControl
      fullWidth
      sx={{
        marginTop: "15px",
      }}
    >
      <InputLabel id="sorting_id">Sort date</InputLabel>
      <Select
        labelId="sorting_id"
        id="sorting_id"
        value={props.sortorder}
        label="Sort date"
        onChange={(e) => {
          props.sortOrderSetter(e.target.value);
        }}
      >
        <MenuItem value={"ascending"}>Ascending</MenuItem>
        <MenuItem value={"descending"}>Descending</MenuItem>
      </Select>
    </FormControl>
  );
};

const QueryForm = (props) => {
  const avaiDateRange = {
    chirps: ["2015-01-01", "2022-06-30"],
    aphrodite_temperature: ["2012-01-01", "2015-12-31"],
  };

  const [datasource, setDataSource] = useState("chirps");
  const [startDate, setStartDate] = useState(
    moment(avaiDateRange[datasource][0])
  );
  const [endDate, setEndDate] = useState(moment(avaiDateRange[datasource][1]));
  const [sortorder, setSortOrder] = useState("ascending");
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.isBusySetter(true);

    const payload = JSON.stringify({
      wards: wards,
      datasource: datasource,
      startDate: startDate.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD"),
      sortorder: sortorder,
    });
    console.log("form payload: " + payload);

    const res = await fetch("http://localhost:9000/query", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: payload,
    });
    const json = await res.json();

    props.datasetSetter(datasource);
    props.querySetter(json);
    props.isBusySetter(false);
  };

  return (
    <form onSubmit={handleSubmit} id="query-form">
      <FormControl fullWidth>
        <MultiSelect
          selectedDistricts={selectedDistricts}
          selectedDistrictsSetter={setSelectedDistricts}
        />
        <WardSelect
          wards={wards}
          wardSetter={setWards}
          selectedDistricts={selectedDistricts}
        />
        <DataSourceSelect
          datasource={datasource}
          dataSourceSetter={setDataSource}
        />
        <DatePicker
          label={"Start Date"}
          startDate={startDate}
          avaiDateRange={avaiDateRange}
          datasource={datasource}
          startDateSetter={setStartDate}
        />
        <DatePicker
          label={"End Date"}
          startDate={endDate}
          avaiDateRange={avaiDateRange}
          datasource={datasource}
          startDateSetter={setEndDate}
        />
        <SortOrderSelect sortorder={sortorder} sortOrderSetter={setSortOrder} />
        <Button
          variant="contained"
          form="query-form"
          type="submit"
          sx={{
            marginTop: "15px",
          }}
        >
          QUERY
        </Button>
      </FormControl>
    </form>
  );
};

const ResponseTable = (props) => {
  let queryData = !props.queryData ? tableEmpty : props.queryData;

  const headers = Object.keys(queryData[0]);

  return (
    <div
      style={{
        width: "100%",
        overflow: "auto",
      }}
    >
      <table>
        <thead>
          <tr>
            {headers.map((h, h_idx) => {
              return (
                <th
                  key={h_idx}
                  style={{
                    whiteSpace: "nowrap",
                    borderStyle: "solid",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                    borderLeftWidth: "1px",
                    borderRightWidth: "1px",
                  }}
                >
                  {h !== "date" ? wardIds[h] : "date"}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {queryData.map((row, r_idx) => {
            let dataRow = Object.values(row);
            let dateValue = dataRow.shift();
            return (
              <tr key={r_idx}>
                <td
                  style={{
                    borderStyle: "solid",
                    borderLeftWidth: "0px",
                    borderRightWidth: "1px",
                    borderTopWidth: "0px",
                    borderBottomWidth: "1px",
                    paddingLeft: "5px",
                    paddingRight: "5px",
                    textAlign: "right",
                  }}
                >
                  {dateValue}
                </td>
                {dataRow.map((value, v_idx) => {
                  return (
                    <td
                      key={v_idx}
                      style={{
                        borderStyle: "solid",
                        borderLeftWidth: "0px",
                        borderRightWidth: "1px",
                        borderTopWidth: "0px",
                        borderBottomWidth: "1px",
                        paddingLeft: "5px",
                        paddingRight: "5px",
                        textAlign: "right",
                      }}
                    >
                      {parseFloat(value) ? parseFloat(value).toFixed(3) : value}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const Query = () => {
  const [queryData, setQueryData] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [dataset, setDataset] = useState();
  const units = {
    chirps: "* mm (milimeters)",
    aphrodite_temperature: "* C (degrees Celsius)",
  };
  const sources = {
    chirps: "https://www.chc.ucsb.edu/data/chirps",
    aphrodite_temperature:
      "http://aphrodite.st.hirosaki-u.ac.jp/product_readme/AphroTemp_V1808_readme.txt",
  };

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Toolbar />
      <Box sx={{ mt: 2, mb: 2, ml: 2, mr: 2 }}>
        <Typography
          sx={{
            fontSize: "25px",
          }}
        >
          Want to explore the datasets on your own? You can use the form below!
        </Typography>
        <Typography>
          You can also download the queried dataset.
          <br />
          <i>Large date range queries might take a long time</i>
        </Typography>
        <QueryForm
          querySetter={setQueryData}
          isBusySetter={setIsBusy}
          datasetSetter={setDataset}
        />
      </Box>
      {isBusy ? (
        <Box sx={{ width: "97%", margin: "0 auto" }}>
          <LinearProgress />
        </Box>
      ) : (
        <Box sx={{ mt: 2, mb: 2, ml: 2, mr: 2 }}>
          <ResponseTable queryData={queryData} />
          <Grid mt={2}>{units[dataset]}</Grid>
          <Grid mt={2}>
            Find more about this data source here:{" "}
            <Link href={sources[dataset]} target="_blank">
              {sources[dataset]}
            </Link>
          </Grid>
          {queryData ? (
            <Grid mt={2}>
              <Link
                download={`dart_${dataset}_${moment()}.json`}
                href={"data:plain/text," + JSON.stringify(queryData)}
              >
                <Button
                  variant="contained"
                  type="button"
                  sx={{
                    marginTop: "15px",
                  }}
                >
                  DOWNLOAD
                </Button>
              </Link>
            </Grid>
          ) : (
            <Grid></Grid>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Query;
