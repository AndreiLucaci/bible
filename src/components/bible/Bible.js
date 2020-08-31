import React from "react";
import { Text } from "../text/Text";
import { getText } from "../../bible";
import "./Bible.css";

export const Bible = () => {
  const result = getText();
  const { oldT, newT } = result.text;

  return (
    <div className="bible">
      <h3>
        {result.display.static}{" "}
        <span className="orange">{result.display.date}</span>
      </h3>
      <div>
        <h3 className="textHeader">Vechiul Testament</h3>
        <Text text={oldT} />
      </div>
      <div>
        <h3 className="textHeader">Noul Testament</h3>
        <Text text={newT} />
      </div>
    </div>
  );
};
