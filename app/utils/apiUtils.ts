import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

export const request = async (
  apiKey: string,
  apiEndpoint: string,
  data: any,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
): Promise<any> => {
  const client = axios.create({
    baseURL: apiEndpoint,
    headers: {
      Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`,
    },
  });

  const options: AxiosRequestConfig = {
    method: method,
    url: "",
    data: data,
  };

  const onSuccess = (response: AxiosResponse): any => {
    return response?.data;
  };

  const onError = (error: any): Promise<any> => {
    return Promise.reject(error?.response?.data);
  };

  return client(options).then(onSuccess).catch(onError);
};
