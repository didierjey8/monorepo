import axios from "axios";
import { API_URL } from "../utils/Constants";

function httpConfig({ endpoint, method, data, headers }) {
  return {
    method: method,
    maxBodyLength: Infinity,
    url: `${API_URL}${endpoint}`,
    headers: headers,
    data: data || null,
  };
}

export default {
  async submitActivities({ data }) {
    return axios.request(
      httpConfig({
        endpoint: `/documents/saveTasksOnSoli`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      })
    );
  },
  async getActivities({ data }) {
    return axios.request(
      httpConfig({
        endpoint: `/documents/readTasksFromSoli`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      })
    );
  },
  async deleteActivities({ data }) {
    return axios.request(
      httpConfig({
        endpoint: `/documents/deleteTasksFromSoli`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      })
    );
  },

  async editActivities({ data }) {
    return axios.request(
      httpConfig({
        endpoint: `/documents/editTasksFromSoli`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      })
    );
  },

  async getctivityEvidence({ data }) {
    return axios.request(
      httpConfig({
        endpoint: `/documents/readTaskSoliEvidence`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      })
    );
  },
  async sendctivityEvidence({ data }) {
    return axios.request(
      httpConfig({
        endpoint: `/documents/saveTaskSoliEvidence`,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: data,
      })
    );
  },
  async deleteativityEvidence({ data }) {
    return axios.request(
      httpConfig({
        endpoint: `/documents/deleteTaskSoliEvidence`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      })
    );
  },
  async editativityEvidence({ data }) {
    return axios.request(
      httpConfig({
        endpoint: `/documents/editTaskSoliEvidence`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      })
    );
  },

  async completeByOwnerTasksFromSoli({ data }) {
    return axios.request(
      httpConfig({
        endpoint: `/documents/completeByOwnerTasksFromSoli`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      })
    );
  },

  async completeTasksFromSoli({ data }) {
    return axios.request(
      httpConfig({
        endpoint: `/documents/completeTasksFromSoli`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      })
    );
  },
  async progressTasksFromSoli({ data }) {
    return axios.request(
      httpConfig({
        endpoint: `/documents/progressTasksFromSoli`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      })
    );
  },
  async readTaskSoliStatusLogs({ data }) {
    return axios.request(
      httpConfig({
        endpoint: `/documents/readTaskSoliStatusLogs`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      })
    );
  },
  async generateCallFromTaskFromSoli({ data }) {
    return axios.request(
      httpConfig({
        endpoint: `/documents/generateCallFromTaskFromSoli`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      })
    );
  },
};
