// lib/categories.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "./categoriesApi";
import { CategoryModel } from "@/app/models/category";

/**
 * Custom hook to fetch categories.
 * Uses react-query's useQuery to manage and cache the category data.
 *
 * @returns {UseQueryResult<CategoryModel[]>} - Query result including loading, error, and data states.
 */
export const useCategories = () => {
  return useQuery<CategoryModel[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
};

/**
 * Custom hook to add a new category.
 * Uses react-query's useMutation to handle adding a category.
 * On success, invalidates the "categories" query to refresh the category list.
 *
 * @returns {UseMutationResult} - Mutation result including loading, error, and data states.
 */
export const useAddCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

/**
 * Custom hook to update an existing category.
 * Uses react-query's useMutation to handle category updates.
 * On success, invalidates the "categories" query to refresh the category list.
 *
 * @returns {UseMutationResult} - Mutation result including loading, error, and data states.
 */
export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

/**
 * Custom hook to delete a category.
 * Uses react-query's useMutation to handle category deletion.
 * On success, invalidates the "categories" query to refresh the category list.
 *
 * @returns {UseMutationResult} - Mutation result including loading, error, and data states.
 */
export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
