import React from "react";
import { Text } from "./Text";
import { getText } from "../bible";

export const Bible = () => {
  const result = getText();
  const { oldT, newT } = result.text;

  return (
    <div>
      <h3>{result.display.static}</h3>
      <div>
        <h3>Vechiul Testament</h3>
        <Text text={oldT} />
      </div>
      <div>
        <h3>Noul Testament</h3>
        <Text text={newT} />
      </div>
    </div>
  );
};
