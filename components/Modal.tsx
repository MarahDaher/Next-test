import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface ReusableModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  submitLabel?: string;
  formId: string;
}

/**
 * ReusableModal component provides a customizable dialog box for form submissions.
 * It includes a title, content area, and action buttons for submit and cancel.
 *
 * @param {ReusableModalProps} props - Properties to configure the modal
 * @param {boolean} props.open - Controls whether the modal is open
 * @param {Function} props.onClose - Function to close the modal
 * @param {string} props.title - Title displayed at the top of the modal
 * @param {React.ReactNode} props.children - Content displayed within the modal
 * @param {string} props.submitLabel - Label for the submit button (optional, defaults to "Submit")
 * @param {string} props.formId - ID of the form to associate with the submit button
 */
const ReusableModal: React.FC<ReusableModalProps> = ({
  open,
  onClose,
  title,
  children,
  formId,
  submitLabel = "Submit",
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      disableEscapeKeyDown
    >
      <DialogTitle>{title}</DialogTitle>

      {/* Modal content area */}
      <DialogContent>{children}</DialogContent>

      {/* Action buttons for cancel and submit */}
      <DialogActions sx={{ paddingRight: "20px" }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary" form={formId}>
          {submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReusableModal;
