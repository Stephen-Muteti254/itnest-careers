import api from "@/lib/api";
import { Application } from "@/types";

export interface ApplicationsQuery {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export const applicationsApi = {
  submit: async (payload: ApplicationPayload) => {
    const formData = new FormData();

    formData.append("job_id", payload.jobId);
    formData.append("name", payload.name);
    formData.append("email", payload.email);
    formData.append("resume", payload.resume);
    formData.append("coverLetter", payload.coverLetter);

    formData.append("experiences", JSON.stringify(payload.experiences || []));
    formData.append("education", JSON.stringify(payload.education || []));

    const res = await api.post("/applications", formData);
    return res.data;
  },

  // ✅ FETCH APPLICATIONS (ADMIN)
  list: async (params: ApplicationsQuery = {}) => {
    const res = await api.get("/applications", { params });
    console.log(res);
    return res.data as {
      applications: Application[];
      pagination: {
        page: number;
        pages: number;
        total: number;
      };
    };
  },

  // ✅ UPDATE STATUS
  updateStatus: async (id: string, status: Application["status"]) => {
    const res = await api.patch(`/applications/${id}/status`, { status });
    return res.data;
  },
};
