import React from "react";
import Typography from "@material-ui/core/Typography";

import { Text } from "../text/Text";
import { getText } from "../../bible";
import "./Bible.css";

export const Bible = () => {
  const result = getText();
  const { oldT, newT } = result.text;

  return (
    <div className="bible" style={{ position: "relative", top: 20 }}>
      <Typography variant="h3">
        {result.display.static}{" "}
        <span className="orange">{result.display.date}</span>
      </Typography>
      <Typography variant="h3"> {result.forToday}</Typography>
      <div style={{ marginTop: 20, marginBottom: 10 }}>
        <Typography className="textHeader" variant="h3">
          Vechiul Testament
        </Typography>
        <Text text={oldT} />
      </div>
      <div style={{ marginTop: 20, marginBottom: 10 }}>
        <Typography className="textHeader" variant="h3">
          Noul Testament
        </Typography>
        <Text text={newT} />
      </div>
    </div>
  );
};
