import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";

/**
 * Fetches a list of images from the API.
 * @returns {Promise<any>} - A promise that resolves to the list of images.
 */
const fetchImages = async () => {
  const { data } = await axiosInstance.get("/images");
  return data;
};

/**
 * Custom hook to fetch the list of images.
 * Uses react-query's useQuery to manage and cache the image data.
 *
 * @returns {UseQueryResult} - Query result including loading, error, and data states.
 */
export const useImages = () => {
  return useQuery({
    queryKey: ["images"],
    queryFn: fetchImages,
  });
};

/**
 * Uploads a new image to the server.
 * Constructs a FormData object to handle image data and other fields.
 *
 * @param {Object} imageData - The data for the image to be uploaded.
 * @param {string} imageData.name - Name of the image.
 * @param {string} imageData.category - Category ID or name for the image.
 * @param {File} imageData.file - The image file to be uploaded.
 * @returns {Promise<any>} - A promise that resolves to the response data.
 */
const uploadImage = async (imageData: {
  name: string;
  category: string;
  file: File;
}) => {
  const formData = new FormData();
  formData.append("name", imageData.name);
  formData.append("category", imageData.category);
  formData.append("file", imageData.file);

  const response = await axiosInstance.post("/images", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

/**
 * Custom hook to upload an image using react-query's useMutation.
 * On success, invalidates the "images" query to refresh the image list.
 *
 * @returns {UseMutationResult} - Mutation result including loading, error, and data states.
 */
export const useUploadImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: uploadImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });
};

/**
 * Deletes an image by ID from the server.
 *
 * @param {number} imageId - The ID of the image to delete.
 * @returns {Promise<void>} - A promise that resolves when the deletion is complete.
 */
const deleteImage = async (imageId: number) => {
  await axiosInstance.delete(`/images/${imageId}`);
};

/**
 * Custom hook to delete an image by ID using react-query's useMutation.
 * On success, invalidates the "images" query to refresh the image list.
 *
 * @returns {UseMutationResult} - Mutation result including loading, error, and data states.
 */
export const useDeleteImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["images"] });
    },
  });
};
