import "date-fns";
import "./DailyBible.css";

import { Accordion, AccordionDetails, AccordionSummary, Paper, Typography } from "@material-ui/core";
import { BibleTextView, BibleVersionPicker } from "@youversion/platform-react-ui";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import React, { useEffect, useMemo, useState } from "react";

import DateFnsUtils from "@date-io/date-fns";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { getPassage } from "../../bible/program";
import { toYouVersionRequests } from "../../api/createRequest";
import { useVersion } from "@youversion/platform-react-hooks";

const DEFAULT_VERSION_ID = 126;

const getInitialVersionId = () => {
  const savedVersionId = Number(window.localStorage.getItem("scriptum-deus:bible-version"));

  return savedVersionId || DEFAULT_VERSION_ID;
};

export const DailyBible = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [versionId, setVersionId] = useState(getInitialVersionId);
  const { version } = useVersion(versionId);

  useEffect(() => {
    window.localStorage.setItem("scriptum-deus:bible-version", String(versionId));
  }, [versionId]);

  const handleVersionChange = (nextVersionId) => {
    setVersionId(nextVersionId);
  };

  const [expanded, setExpanded] = useState({
    oldTestament: false,
    newTestament: false,
  });

  // Keeps text mounted after its first opening, so collapsing/reopening does not fetch again.
  const [loaded, setLoaded] = useState({
    oldTestament: false,
    newTestament: false,
  });

  const { result, oldTestament, newTestament } = useMemo(() => {
    const result = getPassage(selectedDate);
    const [oldTestament, newTestament] = toYouVersionRequests(result.forToday);

    return {
      result,
      oldTestament,
      newTestament,
    };
  }, [selectedDate]);

  const handleDateChange = (date) => {
    if (!date || Number.isNaN(date.getTime())) {
      return;
    }

    setSelectedDate(date);

    setExpanded({
      oldTestament: false,
      newTestament: false,
    });

    setLoaded({
      oldTestament: false,
      newTestament: false,
    });
  };

  const handleAccordionChange = (testament) => (_, isExpanded) => {
    setExpanded((current) => ({
      ...current,
      [testament]: isExpanded,
    }));

    if (isExpanded) {
      setLoaded((current) => ({
        ...current,
        [testament]: true,
      }));
    }
  };

  return (
    <main className="daily-bible-page">
      <Paper className="daily-bible-card" elevation={0}>
        <header className="daily-bible-header">
          <div className="daily-bible-header__content">
            <Typography component="h1" variant="h4" className="daily-bible-title">
              Pasajul zilei
            </Typography>

            <Typography className="daily-bible-date">{result.date}</Typography>

            <Typography className="daily-bible-reference">{result.forToday}</Typography>
          </div>

          <div className="daily-bible-controls">
            <div className="daily-bible-version-picker">
              <Typography className="daily-bible-control-label">Versiune</Typography>

              <BibleVersionPicker.Root versionId={versionId} onVersionChange={setVersionId} background="light" side="bottom">
                <BibleVersionPicker.Trigger>{version?.abbreviation || "NTR"}</BibleVersionPicker.Trigger>

                <BibleVersionPicker.Content />
              </BibleVersionPicker.Root>
            </div>

            <div className="daily-bible-picker">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="none"
                  id="date-picker-inline"
                  label="Alege altă zi"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "Alege altă zi",
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>
          </div>
        </header>

        <Accordion elevation={0} expanded={expanded.oldTestament} onChange={handleAccordionChange("oldTestament")}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="daily-bible-section-title">
              Vechiul Testament
              <span>{oldTestament?.reference}</span>
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <div className="daily-bible-passages">
              {loaded.oldTestament &&
                oldTestament?.passages.map(({ passageId }) => (
                  <div className="daily-bible-passage" key={passageId}>
                    <BibleTextView
                      key={`${passageId}-${versionId}`}
                      reference={passageId}
                      versionId={versionId}
                      fontFamily="serif"
                      fontSize={19}
                      lineHeight={1.8}
                      showVerseNumbers
                      renderNotes
                    />
                  </div>
                ))}
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion elevation={0} expanded={expanded.newTestament} onChange={handleAccordionChange("newTestament")}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className="daily-bible-section-title">
              Noul Testament
              <span>{newTestament?.reference}</span>
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <div className="daily-bible-passages">
              {loaded.newTestament &&
                newTestament?.passages.map(({ passageId }) => (
                  <div className="daily-bible-passage" key={passageId}>
                    <BibleTextView
                      key={`${passageId}-${versionId}`}
                      reference={passageId}
                      versionId={versionId}
                      fontFamily="serif"
                      fontSize={19}
                      lineHeight={1.8}
                      showVerseNumbers
                      renderNotes
                    />
                  </div>
                ))}
            </div>
          </AccordionDetails>
        </Accordion>

        <Typography className="daily-bible-copyright" variant="caption">
          {version?.copyright}
        </Typography>
      </Paper>
    </main>
  );
};
