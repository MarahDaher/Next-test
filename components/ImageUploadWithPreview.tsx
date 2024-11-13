import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

interface ImageUploadWithPreviewProps {
  onFileSelect: (file: File | null) => void;
  label?: string;
  initialPreviewUrl?: string | null;
}

/**
 * ImageUploadWithPreview component allows users to upload an image with preview functionality.
 * Supports drag-and-drop as well as file selection from the device.
 *
 * @param {ImageUploadWithPreviewProps} props - The component props
 * @param {Function} props.onFileSelect - Callback function to handle selected file
 * @param {string} [props.label="Upload Image"] - Label for the upload button
 */
const ImageUploadWithPreview: React.FC<ImageUploadWithPreviewProps> = ({
  onFileSelect,
  label = "Upload Image",
  initialPreviewUrl = null,
}) => {
  const [preview, setPreview] = useState<string | null>(initialPreviewUrl);
  const [isDragging, setIsDragging] = useState(false); // Tracks if a file is being dragged over the drop area

  /**
   * Handles file selection from the file input
   * @param {React.ChangeEvent<HTMLInputElement>} event - The input change event
   */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleFileSelect(file);
  };

  /**
   * Sets the selected file and updates the preview
   * @param {File | null} file - The file to set for preview
   */
  const handleFileSelect = (file: File | null) => {
    onFileSelect(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  /**
   * Handles drag over event to style the drop area
   * @param {React.DragEvent} event - The drag event
   */
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  /**
   * Resets the drag state when the file is dragged away from the drop area
   */
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  /**
   * Handles file drop, processes the dropped file if it's an image
   * @param {React.DragEvent} event - The drop event
   */
  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFileSelect(file);
    }
  };

  /**
   * Removes the currently selected image and clears the preview
   */
  const handleRemoveImage = () => {
    setPreview(null);
    onFileSelect(null);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      {preview ? (
        <>
          {/* Preview of selected image */}
          <Box
            component="img"
            src={preview}
            alt="Selected Image"
            sx={{ width: "100%", borderRadius: 2, mb: 2 }}
          />
          {/* Button to remove selected image */}
          <Button
            onClick={handleRemoveImage}
            variant="outlined"
            color="secondary"
          >
            Remove Image
          </Button>
        </>
      ) : (
        /* Drag-and-drop area with file input */
        <Box
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          sx={{
            border: isDragging ? "2px dashed #1976d2" : "2px dashed #ccc",
            borderRadius: 2,
            padding: 4,
            width: "100%",
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: isDragging ? "#e3f2fd" : "transparent",
          }}
        >
          <Typography variant="body1" color="textSecondary" mb={1}>
            Drag & drop an image here, or
          </Typography>
          {/* Button to open file selection dialog */}
          <Button variant="contained" component="label" size="small">
            {label}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ImageUploadWithPreview;
