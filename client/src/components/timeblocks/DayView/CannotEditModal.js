import React from "react";
import { Modal, Button } from "semantic-ui-react";

const CannotEditModal = ({ modal2Open, handleClose2 }) => (
  <Modal open={modal2Open} onClose={() => handleClose2()}>
    <Modal.Header style={{ color: "white", background: "RebeccaPurple" }}>
      Cannot Edit Timesheet Entry
    </Modal.Header>
    <Modal.Content>
      <h3>Cannot edit timesheet entries in status pending or approved.</h3>
    </Modal.Content>
    <div
      style={{ display: "flex", justifyContent: "flex-end", padding: "20px" }}
    >
      <Button onClick={() => handleClose2()}>Close</Button>
    </div>
  </Modal>
);

export default CannotEditModal;
