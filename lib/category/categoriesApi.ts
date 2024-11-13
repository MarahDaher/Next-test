import { CategoryModel } from "@/app/models/category";
import {
  getCategoriesFromLocalStorage,
  saveCategoriesToLocalStorage,
} from "@/app/utils/localStorage.ts";
import axiosInstance from "../axiosInstance";

type CategoryFormValues = Omit<CategoryModel, "id">;

/**
 * This module provides functions for managing category data,
 * with a focus on using localStorage as a mock data source.
 *
 * NOTE: This approach is intended for development and testing purposes only.
 * For a production environment, it is best to use a server-based API to
 * handle CRUD operations, ensuring data consistency and accessibility across users.
 */

// Fetch all categories from localStorage or API
export const fetchCategories = async (): Promise<CategoryModel[]> => {
  const categories = getCategoriesFromLocalStorage();
  if (categories.length) return categories;

  // If no data is in localStorage, fetch from the API
  const { data } = await axiosInstance.get("/categories");
  saveCategoriesToLocalStorage(data);
  return data;
};

// Add a new category to localStorage
export const addCategory = async (categoryData: CategoryFormValues) => {
  const categories = getCategoriesFromLocalStorage();
  const id = categories.length ? categories[categories.length - 1].id + 1 : 1;
  const newCategory = { id, ...categoryData };
  const updatedCategories = [...categories, newCategory];
  saveCategoriesToLocalStorage(updatedCategories);
  return newCategory;
};

// Update an existing category in localStorage
export const updateCategory = async (
  categoryData: CategoryModel
): Promise<CategoryModel> => {
  const categories = getCategoriesFromLocalStorage();
  const updatedCategories = categories.map((cat: CategoryModel) =>
    cat.id === categoryData.id ? { ...cat, ...categoryData } : cat
  );
  saveCategoriesToLocalStorage(updatedCategories);
  return categoryData;
};

// Delete a category from localStorage by ID
export const deleteCategory = async (categoryId: number): Promise<void> => {
  const categories = getCategoriesFromLocalStorage();
  const updatedCategories = categories.filter(
    (cat: CategoryModel) => cat.id !== categoryId
  );
  saveCategoriesToLocalStorage(updatedCategories);
};

/**
 * Initializes mock categories by checking if localStorage is empty.
 * If empty, it attempts to fetch categories from the API and save them in localStorage.
 */
export const initializeMockCategories = async () => {
  const existingData = getCategoriesFromLocalStorage();
  if (!existingData.length) {
    try {
      const apiCategories = await fetchCategories();
      saveCategoriesToLocalStorage(apiCategories);
      console.log("Initialized categories in local storage from API data.");
    } catch (error) {
      console.error("Failed to fetch categories from API:", error);
    }
  }
};

/**
 * Important Note:
 * This approach of using localStorage as a data source is meant to simulate data storage
 * and retrieval in a local development or testing environment. It allows us to interact
 * with page data as if it were stored persistently, without requiring an actual server.
 *
 * However, in a production environment, localStorage is not a suitable replacement for
 * a database-backed API. A server-based solution is recommended for production, as it
 * provides:
 * - Centralized data storage accessible to all users
 * - Better data consistency and security
 * - Support for concurrent data updates and scalability
 *
 * Consider replacing this mock data approach with actual API endpoints to store data
 * on the server for a robust and scalable application.
 */
