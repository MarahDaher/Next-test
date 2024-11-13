import { useState } from "react";

interface UseConfirmDialogReturn<T> {
  open: boolean;
  item: T | null;
  openDialog: (item: T) => void;
  closeDialog: () => void;
  onConfirm: () => void; // Confirms the action and invokes the callback
}

/**
 * Custom hook for handling confirmation dialogs.
 * Allows opening, closing, and confirming actions associated with an item.
 *
 * @param {Function} onConfirmCallback - Callback function to invoke upon confirmation
 * @returns {UseConfirmDialogReturn<T>} - Object with methods and states for controlling the dialog
 */
export const useConfirmDialog = <T>(
  onConfirmCallback: (item: T) => void
): UseConfirmDialogReturn<T> => {
  const [open, setOpen] = useState(false); // Tracks if the dialog is open
  const [item, setItem] = useState<T | null>(null); // Stores the item to confirm

  /**
   * Opens the confirmation dialog with the provided item.
   * @param {T} item - The item to confirm
   */
  const openDialog = (item: T) => {
    setItem(item);
    setOpen(true);
  };

  /**
   * Closes the confirmation dialog and clears the item.
   */
  const closeDialog = () => {
    setOpen(false);
    setItem(null);
  };

  /**
   * Handles the confirm action by invoking the callback with the current item.
   * Closes the dialog after confirming.
   */
  const onConfirm = () => {
    if (item) {
      onConfirmCallback(item);
    }
    closeDialog();
  };

  return {
    open,
    item,
    openDialog,
    closeDialog,
    onConfirm,
  };
};
