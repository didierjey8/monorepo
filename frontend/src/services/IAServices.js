import axios from "axios";
import { API_URL } from "../utils/Constants";

function httpConfig({ endpoint, method, data }) {
  return {
    method: method,
    maxBodyLength: Infinity,
    url: `${API_URL}${endpoint}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data || null,
  };
}

export default {
  async GenerateActivitiesWithIA({ soli_id, token }) {
    const formdata = new FormData();
    formdata.append("soli_id", soli_id);

    return axios.request(
      httpConfig({
        endpoint: `/documents/generateSuggestTasksFromSoli`,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formdata,
      })
    );
  },
};
