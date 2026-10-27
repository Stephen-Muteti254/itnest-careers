import api from "@/lib/api";
import { Job } from "@/types";

export const jobsApi = {
  getAll: async () => {
    const res = await api.get("/jobs");
    console.log(res);
    return res.data.jobs; // adjust to backend response structure
  },

  getById: async (id: string) => {
    const res = await api.get(`/jobs/${id}`);
    return res.data.job; // assumes your backend returns { job: {...} }
  },

  create: async (payload: Job) => {
    const res = await api.post("/jobs", payload);
    return res.data.job;
  },

  update: async (id: string, payload: Job) => {
    const res = await api.put(`/jobs/${id}`, payload);
    return res.data.job;
  },

  delete: async (id: string) => {
    await api.delete(`/jobs/${id}`);
  },
};
