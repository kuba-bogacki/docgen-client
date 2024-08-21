import {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import style from "../../constans/overwriteMaterialUiStyle";

function Modal({modalTitle, modalBody, displayModal}) {

  const [loadedTitle, setLoadedTitle] = useState("");
  const [loadedBody, setLoadedBody] = useState("");
  const [modalOpen, setModalOpen] = useState(true);

  useEffect(() => {
    loadModalContent();
  }, [modalTitle, modalBody]);

  const loadModalContent = () => {
    setLoadedTitle(modalTitle);
    setLoadedBody(modalBody);
  };

  const closeModal = () => {
    displayModal(false);
    setModalOpen(false)
  };

  return (
    <div className="modal-container">
      <Dialog open={modalOpen} onClose={closeModal}>
        <DialogTitle id="alert-dialog-title" sx={style.modalTitleStyle}>{loadedTitle}</DialogTitle>
        <DialogContent sx={style.modalBodyStyle}>
          <DialogContentText id="alert-dialog-description">{loadedBody}</DialogContentText>
        </DialogContent>
        <DialogActions className="modal-actions-buttons-container">
          <Button onClick={closeModal} sx={style.signUpButtonStyle}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Modal;