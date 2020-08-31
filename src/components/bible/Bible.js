import "date-fns";
import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
} from "@material-ui/core/";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
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
      <Accordion style={{ textAlign: "center" }} elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          centerRipple={true}
          style={{ textAlign: "center" }}
          id="panel1a-header"
        >
          <Container style={{ marginLeft: 35 }}>
            <Typography variant="h5">
              {result.display.static}{" "}
              <Typography variant="subtitle1" color="textSecondary">
                {result.display.date}
              </Typography>
            </Typography>
            <Typography variant="h6"> {result.forToday}</Typography>
          </Container>
        </AccordionSummary>
        <AccordionDetails style={{ textAlign: "center" }}>
          <Container>
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
          </Container>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ textAlign: "center" }} elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          centerRipple={true}
          style={{ textAlign: "center" }}
          id="panel1a-header"
        >
          <Container>
            <div style={{ marginTop: 20, marginBottom: 10, marginLeft: 35 }}>
              <Typography className="textHeader" variant="h5">
                Vechiul Testament
              </Typography>
            </div>
          </Container>
        </AccordionSummary>
        <AccordionDetails style={{ textAlign: "center" }}>
          <Container>
            <Text text={oldT} />
          </Container>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ textAlign: "center" }} elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          centerRipple={true}
          style={{ textAlign: "center" }}
          id="panel1a-header"
        >
          <Container>
            <div style={{ marginTop: 20, marginBottom: 10, marginLeft: 35 }}>
              <Typography className="textHeader" variant="h5">
                Noul Testament
              </Typography>
            </div>
          </Container>
        </AccordionSummary>
        <AccordionDetails style={{ textAlign: "center" }}>
          <Container>
            <Text text={newT} />
          </Container>
        </AccordionDetails>
      </Accordion>
    </Paper>
  );
};
