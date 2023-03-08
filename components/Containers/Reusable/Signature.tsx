import {
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import React, { LegacyRef } from "react";
import ReactSignatureCanvas from "react-signature-canvas";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from '@mui/icons-material/Done';
import useWindowDimensions from "../../Hooks/useWindowsDimensions";


const Signature: React.FC<{
  visible: boolean;
  setVisible: Function;
  signatureRef: LegacyRef<ReactSignatureCanvas> | undefined;
  onSigned: Function;
}> = ({ visible, setVisible, signatureRef }) => {
  const handleClose = () => setVisible(false);
  const {height, width} = useWindowDimensions();

  return (
    <Dialog open={visible} fullScreen>
      <IconButton
        edge="start"
        color="inherit"
        sx={{position: 'fixed', top:10, right: 16}}
        onClick={handleClose}
        aria-label="close"
      >
        <CloseIcon fontSize="large"/>
      </IconButton>
      <IconButton
        edge="start"
        color="inherit"
        sx={{position: 'fixed', top:10, left: 16}}
        onClick={handleClose}
        aria-label="close"
      >
        <DoneIcon fontSize="large"/>
      </IconButton>
      <DialogContent sx={{padding:'0', overflow:"hidden"}}>
        <ReactSignatureCanvas
          ref={signatureRef}
          canvasProps={{
              width: `${width}px`,
              height: `${height}px`,
              className: 'sigCanvas',
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default Signature;