import axiosConfig from "./axiosConfig";
import RecipeType from "../type";

const  AxiosService = {
  async getAll() {
    return await axiosConfig.get<Array<RecipeType>>("/list");
  },

  async find(data: RecipeType){
    return await axiosConfig.get<any>("/find", {data})
  },

  async create(data: RecipeType) {
    return await axiosConfig.post<RecipeType>("/create", data);
  },

  async update(data: RecipeType, id: any) {
    return await axiosConfig.put<any>(`/update/${id}`, data);
  },

  async delete(id: any) {
    return await axiosConfig.delete<any>(`/delete/${id}`)
  }
}

export default  AxiosService
