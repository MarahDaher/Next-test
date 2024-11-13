"use client";

import React, { useState } from "react";
import CategoryForm from "./category-form";
import ConfirmDialog from "@/components/ConfirmDialog";
import LoadingCategories from "./loading";
import ReusableModal from "@/components/Modal";
import ReusableTable from "@/components/Table";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import { CategoryModel } from "@/app/models/category";
import { FormikHelpers } from "formik";
import { TableColumn } from "@/app/models/util";
import { toast } from "react-toastify";
import {
  useAddCategory,
  useCategories,
  useDeleteCategory,
  useUpdateCategory,
} from "@/lib/category/categories";
import { useConfirmDialog } from "@/app/hooks/useConfirmDialog";

type CategoryFormValues = Omit<CategoryModel, "id">;

/**
 * CategoryManagement component provides an interface for managing categories.
 * Users can add, edit, and delete categories. Categories are displayed in a table.
 */
export default function CategoryManagement() {
  // State Hooks
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<CategoryModel | null>(
    null
  );

  // Data Fetching Hooks
  const { data: categories, isLoading } = useCategories();
  const addCategoryMutation = useAddCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  // Table Configuration
  const tableColumns: TableColumn<CategoryModel>[] = [
    {
      id: "image",
      label: "",
      width: 20,
      render: (row: CategoryModel) => <Avatar src={row.image} alt={row.name} />,
    },
    { id: "name", label: "Name" },
    { id: "description", label: "Description" },
  ];

  // Modal Handlers

  /**
   * Opens the modal in "Add" mode, resetting current category and edit mode.
   */
  const handleOpenAddModal = () => {
    setCurrentCategory(null);
    setEditMode(false);
    setModalOpen(true);
  };

  /**
   * Opens the modal in "Edit" mode with the selected category's data.
   * @param {CategoryModel} category - The category to edit
   */
  const handleOpenEditModal = (category: CategoryModel) => {
    setCurrentCategory(category);
    setEditMode(true);
    setModalOpen(true);
  };

  /**
   * Closes the modal and resets the form and state.
   */
  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentCategory(null);
    setEditMode(false);
  };

  // Submit Handler

  /**
   * Handles form submission for adding or updating a category.
   * @param {CategoryFormValues} data - The form data for the category
   * @param {FormikHelpers<CategoryFormValues>} formikHelpers - Formik helper functions
   */
  const handleSubmit = (
    data: CategoryFormValues,
    formikHelpers: FormikHelpers<CategoryFormValues>
  ) => {
    if (isEditMode && currentCategory) {
      // Update mode
      updateCategoryMutation.mutate(
        { id: currentCategory.id, ...data },
        {
          onSuccess: () => {
            toast.success("Category updated successfully!");
            handleCloseModal();
            formikHelpers.resetForm();
          },
          onError: () => {
            toast.error("Failed to update category.");
          },
        }
      );
    } else {
      // Add mode
      addCategoryMutation.mutate(data, {
        onSuccess: () => {
          toast.success("Category added successfully!");
          handleCloseModal();
          formikHelpers.resetForm();
        },
        onError: () => {
          toast.error("Failed to add category.");
        },
      });
    }
  };

  // Delete Confirmation Dialog

  /**
   * Handles category deletion with a confirmation dialog.
   */
  const {
    open,
    item: selectedCategory,
    openDialog,
    closeDialog,
    onConfirm,
  } = useConfirmDialog<CategoryModel>((item: CategoryModel) => {
    deleteCategoryMutation.mutate(item.id, {
      onSuccess: () => toast.success("Category deleted successfully!"),
      onError: () => toast.error("Failed to delete category."),
    });
  });

  return (
    <>
      {/* Header with title and add button */}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
        py={2}
      >
        <Typography variant="h6">Categories</Typography>
        <Button variant="contained" onClick={handleOpenAddModal}>
          Add Category
        </Button>
      </Stack>

      {/* Category Table */}
      {isLoading ? (
        <LoadingCategories />
      ) : (
        categories && (
          <ReusableTable
            columns={tableColumns}
            data={categories}
            onDelete={openDialog}
            onEdit={handleOpenEditModal}
          />
        )
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={open}
        onConfirm={onConfirm}
        onCancel={closeDialog}
        title="Confirm Deletion"
        message={
          selectedCategory
            ? `Are you sure you want to delete ${selectedCategory.name}?`
            : ""
        }
      />

      {/* Add/Edit Modal */}
      <ReusableModal
        open={isModalOpen}
        onClose={handleCloseModal}
        title={isEditMode ? "Edit Category" : "Add Category"}
        submitLabel={isEditMode ? "Update Category" : "Add Category"}
        formId="category-form"
      >
        <CategoryForm
          onSubmit={handleSubmit}
          initialValues={{
            name: currentCategory?.name || "",
            description: currentCategory?.description || "",
            image: currentCategory?.image || "",
          }}
          isEditMode={isEditMode}
          initialImageUrl={currentCategory?.image || ""}
        />
      </ReusableModal>
    </>
  );
}
