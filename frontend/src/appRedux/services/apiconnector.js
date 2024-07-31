import axios from "axios";

export const axiosInstance = axios.create({}); // .create({})-> with this function you will able make api call of any METHOD Like Post , Put , Get and Delete

export const apiConnector = (method, url, bodData, headers, params) => {
  return axiosInstance({
    method: `${method}`,
    url: `${url}`,
    data: bodData ? bodData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};
