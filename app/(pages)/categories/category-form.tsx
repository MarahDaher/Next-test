import * as Yup from "yup";
import ImageUploadWithPreview from "@/components/ImageUploadWithPreview";
import React from "react";
import { CategoryModel } from "@/app/models/category";
import { Form, Formik, FormikHelpers } from "formik";
import { Stack, TextField } from "@mui/material";

type CategoryFormValues = Omit<CategoryModel, "id"> & {
  imageFile?: File | null;
};

interface CategoryFormProps {
  onSubmit: (
    values: CategoryFormValues,
    formikHelpers: FormikHelpers<CategoryFormValues>
  ) => void;
  initialValues: CategoryFormValues;
  isEditMode?: boolean;
  initialImageUrl?: string;
}

// Validation schema using Yup to enforce validation rules for the form fields
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  description: Yup.string(),
  image: Yup.mixed().required("Image is required"),
});

/**
 * CategoryForm component provides a form to create or edit a category.
 * The form includes fields for name, description, and image upload.
 */
const CategoryForm: React.FC<CategoryFormProps> = ({
  onSubmit,
  initialValues,
  isEditMode = false,
  initialImageUrl,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ values, handleChange, setFieldValue, touched, errors }) => (
        <Form id="category-form">
          <Stack spacing={2}>
            {/* Name Field */}
            <TextField
              label="Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              fullWidth
            />

            {/* Description Field */}
            <TextField
              label="Description"
              name="description"
              value={values.description}
              onChange={handleChange}
              fullWidth
            />

            {/* Image Upload with Preview */}
            <ImageUploadWithPreview
              label="Upload Image"
              onFileSelect={(file) => setFieldValue("image", file)}
              initialPreviewUrl={isEditMode ? initialImageUrl : null}
            />
            {touched.image && errors.image && (
              <p style={{ color: "red" }}>{errors.image}</p>
            )}
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default CategoryForm;
