import { CategoryModel } from "../models/category";

export const getCategoriesFromLocalStorage = () => {
  const categories = localStorage.getItem("categories");
  return categories ? JSON.parse(categories) : [];
};

export const saveCategoriesToLocalStorage = (categories: CategoryModel[]) => {
  localStorage.setItem("categories", JSON.stringify(categories));
};
