import { defineStore } from "pinia";
import axios from "axios";

export const useData = defineStore("data-store", () => {
  const getJobs = async () => {
    try {
      const response = await axios.get(`/v1/jobs/`);

      return response.data;
    } catch (error) {}
  };

  const getSkills = async () => {
    try {
      const response = await axios.get(`/v1/skills/`);

      return response.data;
    } catch (error) {}
  };

  const storeData = async (form) => {
    try {
      const response = await axios.post("/v1/candidates", form);
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getJobs,
    getSkills,
    storeData,
  };
});
