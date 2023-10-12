import axios from "axios";

const getAll = (baseUrl: string) =>
  axios.get(baseUrl).then((response) => response.data);

export { getAll };
