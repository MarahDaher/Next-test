import * as Yup from "yup";
import ImageUploadWithPreview from "@/components/ImageUploadWithPreview";
import React from "react";
import { CategoryModel } from "@/app/models/category";
import { Form, Formik, FormikHelpers } from "formik";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";

interface ImageUploadFormProps {
  onSubmit: (data: { name: string; category: string; file: File }) => void;
  categories: CategoryModel[];
}

/**
 * ImageUploadForm component for uploading an image with metadata.
 * Provides fields for image name, category selection, and file upload.
 */
const ImageUploadForm: React.FC<ImageUploadFormProps> = ({
  onSubmit,
  categories,
}) => {
  // Initial values for form fields
  const initialValues = {
    name: "",
    category: "",
    file: null as File | null,
  };

  // Validation schema using Yup for form validation
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    category: Yup.string().required("Category is required"),
    file: Yup.mixed().required("File is required"),
  });

  /**
   * Handles form submission, triggers the onSubmit prop function with form values
   * @param {Object} values - Form field values
   * @param {Object} formikHelpers - Helpers provided by Formik for form manipulation
   */
  const handleSubmit = (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof initialValues>
  ) => {
    if (values.file) {
      onSubmit({
        name: values.name,
        category: values.category,
        file: values.file,
      });
      formikHelpers.resetForm(); // Reset form after submission
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, touched, errors, handleChange }) => (
        <Form id="image-upload-form">
          <Stack spacing={2} pt={2}>
            {/* Image Name Field */}
            <TextField
              label="Image Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              fullWidth
            />

            {/* Category Selection Dropdown */}
            <FormControl
              fullWidth
              error={touched.category && Boolean(errors.category)}
            >
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={values.category}
                onChange={handleChange}
                label="Category"
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
              {touched.category && errors.category && (
                <p style={{ color: "red" }}>{errors.category}</p>
              )}
            </FormControl>

            {/* Image File Upload with Preview */}
            <ImageUploadWithPreview
              label="Select Image"
              onFileSelect={(file) => setFieldValue("file", file)}
            />
            {touched.file && errors.file && (
              <p style={{ color: "red" }}>{errors.file}</p>
            )}
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default ImageUploadForm;
