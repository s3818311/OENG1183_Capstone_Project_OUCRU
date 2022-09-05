import React, { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import tableEmpty from "../../tempdata/query_builder_table_empty";
import districtsWards from "../../tempdata/districts_wards";
import wardIds from "../../tempdata/wards_id3";
import { Accordion } from "@mui/material";
import AccordionDetails from '@mui/material/AccordionDetails';
import styled from "styled-components";


const WardSelect = (props) => {
  const districts = Object.keys(districtsWards);

  const handleChange = (e) => {
    if (e.target.checked) {
      props.wardSetter([...props.wards, e.target.id]);
    } else {
      props.wardSetter(props.wards.filter((w) => w !== e.target.id));
    }
    console.log(props.wards);
  };

  return (
    <div>
      {districts.map((d) => {
        return (
          <div>
            <b>{d}:</b>{" "}
            {districtsWards[d].map((ward) => {
              let k = Object.keys(ward);
              return (
                <>
                  <input
                    type="checkbox"
                    id={k[0]}
                    name="wards"
                    onChange={handleChange}
                  ></input>
                  <label for={k[0]}> {ward[k[0]]} </label>
                </>
              );
            })}
			</div>
        );
      })}
    </div>
  );
};

const QueryForm = (props) => {
  const avaiDateRange = {
    chirps: ["2015-01-01", "2022-06-30"],
    aphrodite_temperature: ["2012-01-01", "2015-12-31"],
  };

  const [datasource, setDataSource] = useState("chirps");
  const [startDate, setStartDate] = useState(avaiDateRange[datasource][0]);
  const [endDate, setEndDate] = useState(avaiDateRange[datasource][1]);
  const [sortorder, setSortOrder] = useState("ascending");
  const [wards, setWards] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = JSON.stringify({
      wards: wards,
      datasource: datasource,
      startDate: startDate,
      endDate: endDate,
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

    props.querySetter(json);
  };

  return (
    <form onSubmit={handleSubmit} id="query-form">
      <WardSelect wards={wards} wardSetter={setWards} />
      <label htmlFor="datasource_id">
        Data source:{" "}
        <select
          id="datasource_id"
          name="datasource"
          onChange={(e) => {
            setDataSource(e.target.value);
          }}
        >
          <option value="chirps" selected>
            CHIRPS - Rainfall Estimates
          </option>
          <option value="aphrodite_temperature">
            APHRODITE - Daily Mean Temperature
          </option>
        </select>
      </label>
      <label htmlFor="startdate_id">
        Start date:{" "}
        <input
          type="date"
          id="startdate_id"
          name="startdate"
          value={startDate}
          min={avaiDateRange[datasource][0]}
          max={avaiDateRange[datasource][1]}
          onChange={(e) => {
            setStartDate(e.target.value);
          }}
        ></input>
      </label>
      <label htmlFor="enddate_id">
        End date:{" "}
        <input
          type="date"
          id="enddate_id"
          value={endDate}
          min={avaiDateRange[datasource][0]}
          max={avaiDateRange[datasource][1]}
          name="enddate"
          onChange={(e) => {
            setEndDate(e.target.value);
          }}
        ></input>
      </label>
      <label htmlFor="sorting_id">
        Sort date by:{" "}
        <select
          id="sorting_id"
          name="sortorder"
          onChange={(e) => {
            setSortOrder(e.target.value);
          }}
        >
          <option value="ascending" selected>
            Ascending
          </option>
          <option value="descending">Descending</option>
        </select>
      </label>
      <button form="query-form" type="submit">
        Query
      </button>
    </form>
  );
};

const ResponseTable = (props) => {
  let queryData = !props.queryData ? tableEmpty : props.queryData;

  const headers = Object.keys(queryData[0]);

  return (
    <table>
      <tr>
        {headers.map((h) => {
          return <th>{h !== "date" ? wardIds[h] : "date"}</th>;
        })}
      </tr>
      {queryData.map((row) => {
        return (
          <tr>
            {Object.values(row).map((value) => {
              return <td>{value}</td>;
            })}
          </tr>
        );
      })}
    </table>
  );
};

const Query = () => {
  const [queryData, setQueryData] = useState(false);

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
        Want to explore the datasets on your own? You can use the form below!
        <br />
        <i>Large date range queries might take a long time</i>
        <QueryForm querySetter={setQueryData} />
      </Box>
      <Box sx={{ mt: 2, mb: 2, ml: 2, mr: 2 }}>
        <ResponseTable queryData={queryData} />
      </Box>
    </Box>
  );
};

export default Query;
