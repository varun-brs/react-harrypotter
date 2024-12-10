import axios from "axios";

const BaseURL = process.env.REACT_APP_API_ENDPOINT;

export const HttpGet = async () => {
  let oResponse = await axios.get(BaseURL);
  return oResponse?.data;
};
