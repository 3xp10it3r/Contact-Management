import AxiosClient from "../lib/AxiosClient";
import { EndpointsEnum } from "../utils/constants";

export const getContacts = async () => {
  try {
    const response = await AxiosClient.get(EndpointsEnum.Contacts);
    return response?.data?.contacts;
  } catch (error) {
    console.error(error);
  }
};
