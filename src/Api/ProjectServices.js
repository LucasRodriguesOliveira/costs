import { Api } from "./Api";

export const getProjectServices = async (projectId) => {
  return Api.get(`services?projectId=${projectId}`);
};

export const getProjectServiceById = async (id) => {
  return Api.get(`services/${id}`);
};

export const postProjectService = async (data) => {
  return Api.post('services', JSON.stringify(data));
};

export const deleteProjectService = async (id) => {
  return Api.delete(`services/${id}`);
};

export const updateProjectService = async (id, data) => {
  return Api.update(`services/${id}`, JSON.stringify(data));
};
