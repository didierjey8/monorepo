import axios from "axios";
import { API_URL } from "../utils/Constants";

export default {
  async get({ id = null, like, filter, tags, order, params, view = "grid" } = {}) {
    if (id) {
      return await axios.postForm(`${API_URL}/documents/seguimiento`, { seguimiento_: id });
    } else {
      return await axios.post(
        `${API_URL}/documents/load`,
        new URLSearchParams({ like, filter, tags, order, params, view })
      );
    }
  },
};
