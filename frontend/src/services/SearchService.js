import axios from "axios";
import { API_URL } from "../utils/Constants";

export default {
  async get({ ...body } = {}) {
    return await axios.postForm(`${API_URL}/users/find_all`, body);
  },
};
