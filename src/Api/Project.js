import { Api } from "./Api";

export const postProject = async (data) => {
  return Api.post('projects', JSON.stringify(data));
};

export const getProjects = async () => {
  return Api.get('projects');
};

export const deleteProject = async (id) => {
  return Api.delete(`projects/${id}`);
};

export const findById = async (id) => {
  return Api.get(`projects/${id}`);
}

export const updateProject = async (id, data) => {
  return Api.update(`projects/${id}`, JSON.stringify(data));
}
