import { passage } from "./program";
import parse from "./parse";

export const getText = () => {
  const passageResponse = passage();

  const response = {
    ...passageResponse,
    text: parse(passageResponse.forToday),
  };

  return response;
};
