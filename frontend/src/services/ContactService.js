import axios from "axios";
import { API_URL } from "../utils/Constants";

export default {
  async get({ id = null, params = {} } = {}) {
    if (id) {
      return await axios.postForm(`${API_URL}/users/getContactInfo`, { id });
    } else {
      return await axios.post(`${API_URL}/users/getAllC`, new URLSearchParams({ ...params }));
    }
  }
};
