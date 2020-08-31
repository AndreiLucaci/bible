import "date-fns";
import React, { useState, useEffect } from "react";
import { Typography, Paper } from "@material-ui/core/";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { Text } from "../text/Text";
import { getText } from "../../bible";
import "./Bible.css";

export const Bible = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [oldT, setOldT] = useState({});
  const [newT, setNewT] = useState({});
  const [result, setResult] = useState({ display: {} });

  const handleDateChange = (val) => {
    setSelectedDate(val);
  };

  useEffect(() => {
    const pResult = getText(selectedDate);
    setResult(pResult);
    setOldT(pResult.text.oldT);
    setNewT(pResult.text.newT);
  }, [selectedDate]);

  return (
    <Paper
      className="bible"
      style={{ position: "relative", top: 20 }}
      variant="elevation"
      elevation={0}
    >
      <Typography variant="h5">
        {result.display.static}{" "}
        <Typography variant="subtitle1" color="secondary">
          {result.display.date}
        </Typography>
      </Typography>
      <Typography variant="h6"> {result.forToday}</Typography>

      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          color="#121212"
          variant="inline"
          style={{ color: "#FFF" }}
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Alege alta zi"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "Alege alta zi",
          }}
        />
      </MuiPickersUtilsProvider>

      <div style={{ marginTop: 20, marginBottom: 10 }}>
        <Typography className="textHeader" variant="h5">
          Vechiul Testament
        </Typography>
        <Text text={oldT} />
      </div>
      <div style={{ marginTop: 20, marginBottom: 10 }}>
        <Typography className="textHeader" variant="h5">
          Noul Testament
        </Typography>
        <Text text={newT} />
      </div>
    </Paper>
  );
};
