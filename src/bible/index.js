import { passage } from "./program";

export const getText = (date = undefined) => {
  const passageResponse = passage(date);

  const response = {
    ...passageResponse,
  };

  return response;
};
