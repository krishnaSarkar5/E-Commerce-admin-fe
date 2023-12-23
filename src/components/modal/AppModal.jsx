import React from "react";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Modal from "@mui/joy/Modal";
import ModalDialog from "@mui/joy/ModalDialog";
import DialogTitle from "@mui/joy/DialogTitle";
import DialogContent from "@mui/joy/DialogContent";
import Stack from "@mui/joy/Stack";
import Add from "@mui/icons-material/Add";

const AppModal = ({ show, setShow, title, children }) => {
  return (
    <Modal open={show} onClose={() => setShow(false)}>
      <ModalDialog size="lg" sx={{ width: "40%", overflowY: "scroll" }}>
        <DialogTitle>{title}</DialogTitle>
        {/* <DialogContent>Fill in the information of the project.</DialogContent> */}
        {children}
        {/* <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input autoFocus required />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Input required />
              </FormControl>
              <Button type="submit">Submit</Button>
            </Stack>
          </form> */}
      </ModalDialog>
    </Modal>
  );
};

export default AppModal;
