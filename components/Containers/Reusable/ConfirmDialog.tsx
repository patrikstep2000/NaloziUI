import { Button, DialogActions, Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";
import { ConfirmDialogOptions, DialogResult } from "../../Models/ConfirmDialogOptions";

const ConfirmDialog: React.FC<{
    open: boolean;
    setOpen: Function;
    message?: string;
    title?:string;
    options: ConfirmDialogOptions[];
    onClick: (result: DialogResult) => void;
}> = ({ open, setOpen, message, title, options, onClick }) => {
  const handleClose = () => setOpen(false);

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-confirm"
        aria-describedby="modal-yes-no"
        maxWidth='lg'
      >
        {title &&
          <DialogTitle id="alert-dialog-title">
            {title}
          </DialogTitle> 
        }
        <DialogContent>
          {message && 
            <DialogContentText id="alert-dialog-description">
              {message}
            </DialogContentText>
          }
        </DialogContent>
        <DialogActions>
            {options.map((option: ConfirmDialogOptions) => (
                <Button
                    key={option.name}
                    sx={{width:'100%'}}
                    onClick={() => onClick(option.result)}
                >
                    {option.name}
                </Button>
            ))}
          </DialogActions>
      </Dialog>
  );
};

export default ConfirmDialog;