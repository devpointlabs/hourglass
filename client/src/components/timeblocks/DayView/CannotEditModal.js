import React from "react";
import { Modal, Button } from "semantic-ui-react";

const CannotEditModal = ({ modal2Open, handleClose2 }) => (
  <Modal open={modal2Open} onClose={() => handleClose2()}>
    <Modal.Header style={{ color: "white", background: "RebeccaPurple" }}>
      Edit Timesheet Entry
    </Modal.Header>
    <Modal.Content>
      <h3>
        Cannot edit this entry. It has already been submitted for approval.
      </h3>
    </Modal.Content>
    <div
      style={{ display: "flex", justifyContent: "flex-end", padding: "20px" }}
    >
      <Button onClick={() => handleClose2()}>Close</Button>
    </div>
  </Modal>
);

export default CannotEditModal;
