import { passage } from "./program";
import parse from "./parse";

export const getText = (date = undefined) => {
  const passageResponse = passage(date);

  const response = {
    ...passageResponse,
    text: parse(passageResponse.forToday),
  };

  return response;
};
