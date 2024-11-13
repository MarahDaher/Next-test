"use client";

import ConfirmDialog from "@/components/ConfirmDialog";
import ImageGallery from "@/components/ImageGallery";
import ImageUploadForm from "./image-form";
import LoadingImages from "./loading";
import ReusableModal from "@/components/Modal";
import {
  Button,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { ImageModel } from "../../models/image";
import { toast } from "react-toastify";
import { useCategories } from "@/lib/category/categories";
import { useConfirmDialog } from "../../hooks/useConfirmDialog";
import { useDeleteImage, useImages, useUploadImage } from "@/lib/images";
import { useState, useEffect } from "react";

// Utility functions
function parseSize(sizeStr: string): number {
  const size = parseFloat(sizeStr);
  if (sizeStr.toLowerCase().includes("kb")) return size * 1024;
  if (sizeStr.toLowerCase().includes("mb")) return size * 1024 * 1024;
  return size;
}

export default function ImageManagement() {
  const { data: images, isLoading } = useImages();
  const { data: categories } = useCategories();
  const uploadImageMutation = useUploadImage();
  const deleteImageMutation = useDeleteImage();

  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Range filters initially set to null (no filter applied)
  const [sizeRange, setSizeRange] = useState<[number, number] | null>(null);
  const [filteredImages, setFilteredImages] = useState<ImageModel[] | null>(
    images
  );

  const {
    open,
    item: selectedImage,
    openDialog,
    closeDialog,
    onConfirm,
  } = useConfirmDialog<ImageModel>((item: ImageModel) => {
    deleteImageMutation.mutate(item.id, {
      onSuccess: () => toast.success("Image deleted successfully!"),
      onError: () => toast.error("Failed to delete image."),
    });
  });

  const handleUploadClick = () => setUploadModalOpen(true);
  const handleCloseUploadModal = () => setUploadModalOpen(false);

  const handleImageUpload = (imageData: {
    name: string;
    category: string;
    file: File;
  }) => {
    uploadImageMutation.mutate(imageData, {
      onSuccess: () => {
        toast.success("Image uploaded successfully!");
        setUploadModalOpen(false);
      },
      onError: () => toast.error("Failed to upload image."),
    });
  };

  // Filter images only when filters are updated
  useEffect(() => {
    if (!images) return;

    const applyFilters = () => {
      return images.filter((image: ImageModel) => {
        const matchesName = searchTerm
          ? image.name.toLowerCase().includes(searchTerm.toLowerCase())
          : true;
        const matchesCategory = categoryFilter
          ? image.categoryId === parseInt(categoryFilter)
          : true;

        // Apply size filter if set (convert size from MB to KB for comparison)
        const imageSize = parseSize(image.metadata.size) / (1024 * 1024); // Convert to MB
        const matchesSize = sizeRange
          ? imageSize >= sizeRange[0] && imageSize <= sizeRange[1]
          : true;

        return matchesName && matchesCategory && matchesSize;
      });
    };

    setFilteredImages(applyFilters());
  }, [images, searchTerm, categoryFilter, sizeRange]);

  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={2}
        py={2}
      >
        <Typography variant="h6">Image Gallery</Typography>
        <Button variant="contained" onClick={handleUploadClick}>
          Upload
        </Button>
      </Stack>

      <Stack direction="row" justifyContent="space-between" spacing={3} py={2}>
        <Stack direction="row" spacing={2} alignItems="center" width="50%">
          <TextField
            label="Search by Name"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            displayEmpty
            size="small"
          >
            <MenuItem value="">
              <p>All Categories</p>
            </MenuItem>
            {categories?.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </Stack>
        <Stack
          direction="row"
          spacing={4}
          alignItems="center"
          justifyContent="end"
          width="50%"
        >
          <Typography gutterBottom>Filter by Size (MB)</Typography>
          <Slider
            value={sizeRange || [0, 10]} // Default to range in MB
            onChange={(e, newValue) =>
              setSizeRange(newValue as [number, number])
            }
            valueLabelDisplay="auto"
            min={0}
            max={100} // Adjust max as needed (e.g., 100 MB)
            valueLabelFormat={(value) => `${value} MB`}
            sx={{ width: "100%", maxWidth: "300px", marginRight: "1rem" }} // Set full width with max width limit
          />
        </Stack>
      </Stack>

      {isLoading ? (
        <LoadingImages />
      ) : (
        filteredImages &&
        categories && (
          <ImageGallery
            items={filteredImages}
            categories={categories}
            onDelete={openDialog}
          />
        )
      )}

      <ConfirmDialog
        open={open}
        onConfirm={onConfirm}
        onCancel={closeDialog}
        title="Confirm Deletion"
        message={
          selectedImage
            ? `Are you sure you want to delete ${selectedImage.name}?`
            : ""
        }
      />

      <ReusableModal
        open={isUploadModalOpen}
        onClose={handleCloseUploadModal}
        title="Upload Image"
        formId="image-upload-form"
        submitLabel="Upload"
      >
        <ImageUploadForm
          onSubmit={handleImageUpload}
          categories={categories ?? []}
        />
      </ReusableModal>
    </>
  );
}
