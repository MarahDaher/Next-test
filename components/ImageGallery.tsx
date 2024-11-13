import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import { CategoryModel } from "@/app/models/category";
import { format } from "date-fns";
import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack,
} from "@mui/material";
import { ImageModel } from "@/app/models/image";

interface ImageGalleryProps {
  items: ImageModel[];
  categories: CategoryModel[];
  onDelete: (item: ImageModel) => void;
}

/**
 * ImageGallery component displays a grid of images with details and a delete option.
 * Each image displays its name, upload date, metadata, and category.
 *
 * @param {ImageGalleryProps} props - Props for configuring the image gallery
 * @param {ImageModel[]} props.items - List of images to display
 * @param {CategoryModel[]} props.categories - List of categories to categorize images
 * @param {Function} props.onDelete - Callback function for handling image deletion
 */
export default function ImageGallery(props: ImageGalleryProps) {
  const { items, categories, onDelete } = props;

  return (
    <>
      {categories && (
        <ImageList cols={4}>
          {items.map((item: ImageModel) => {
            // Format the upload date
            const formattedDate = format(
              new Date(item.uploadDate),
              "MMMM do, yyyy, HH:mm"
            );

            // Find the category for the image
            const category = categories.find(
              (cat) => cat.id === item.categoryId
            );

            return (
              <ImageListItem key={item.url}>
                {/* Display image with Next.js Image optimization */}
                <Image
                  src={item.url}
                  width={800}
                  height={500}
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 800px"
                  alt={item.name}
                  quality={75}
                />

                {/* Image details bar with name, date, size, resolution, and category */}
                <ImageListItemBar
                  title={item.name}
                  subtitle={
                    <>
                      {/* Upload date */}
                      <Stack py={0.5}>{formattedDate}</Stack>

                      {/* Image metadata (size and resolution) */}
                      <Stack py={0.5}>
                        Size: {item.metadata.size}, Resolution:{" "}
                        {item.metadata.resolution}
                      </Stack>

                      {/* Category name and description if available */}
                      {category && (
                        <Stack py={0.5}>
                          Category: {category.name} - {category.description}
                        </Stack>
                      )}
                    </>
                  }
                  /* Action icon for deleting the image */
                  actionIcon={
                    <IconButton
                      sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      aria-label={`delete ${item.name}`}
                      onClick={() => onDelete(item)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      )}
    </>
  );
}
