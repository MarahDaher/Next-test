import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * ConfirmDialog component displays a confirmation dialog with customizable title and message.
 * Used for confirming user actions, such as deletions.
 *
 * @param {ConfirmDialogProps} props - Props to configure the dialog
 * @param {boolean} props.open - Whether the dialog is open
 * @param {string} [props.title="Confirm"] - Title of the dialog
 * @param {string} [props.message="Are you sure you want to delete this item?"] - Message inside the dialog
 * @param {Function} props.onConfirm - Callback for confirming the action
 * @param {Function} props.onCancel - Callback for canceling the action
 */
const ConfirmDialog = ({
  open,
  title = "Confirm",
  message = "Are you sure you want to delete this item?",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => (
  <Dialog open={open} onClose={onCancel}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{message}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} color="primary">
        Cancel
      </Button>
      <Button onClick={onConfirm} color="secondary" autoFocus>
        Delete
      </Button>
    </DialogActions>
  </Dialog>
);

export default ConfirmDialog;
