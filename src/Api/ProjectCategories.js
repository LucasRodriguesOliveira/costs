import { Api } from './Api';

export const getProjectCategories = async () => {
  return Api.get('categories');
}

export const getProjectCategoryById = async (id) => {
  return Api.get(`categories/${id}`)
}
