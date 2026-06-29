import { getPassage } from "../bible/program";
import { toYouVersionRequests } from "./createRequest";

export const createRequestUrls = (inputDate = undefined) => {
  const program = getPassage(inputDate);

  const requests = toYouVersionRequests(program.forToday);

  return requests;
};
