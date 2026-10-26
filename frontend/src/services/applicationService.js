import api from "./api";

const applicationService = {

    // Get all applications
    getAll: async () => {
        const response = await api.get("/job-applications");
        return response.data.data;
    },

    // Get one application
    getById: async (id) => {
        const response = await api.get(`/job-applications/${id}`);
        return response.data.data;
    },

    // Create an application
    create: async (applicationData) => {
        const response = await api.post(
            "/job-applications",
            applicationData
        );

        return response.data.data;
    },

    // Update an application
    update: async (id, applicationData) => {
        const response = await api.patch(
            `/job-applications/${id}`,
            applicationData
        );

        return response.data.data;
    },

    // Delete an application
    delete: async (id) => {
        const response = await api.delete(
            `/job-applications/${id}`
        );

        return response.data;
    },
};

export default applicationService;