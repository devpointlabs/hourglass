import React from "react";
import { Modal, Button, Header, Form } from "semantic-ui-react";
import moment from "moment";

const CannotEditModal = ({ modal2Open, handleClose2, timeBlock }) => (
  <Modal open={modal2Open} onClose={() => handleClose2()}>
    <Modal.Header style={{ color: "white", background: "RebeccaPurple" }}>
      Cannot Edit Timesheet Entry
    </Modal.Header>
    <Form style={{ padding: "10px" }}>
      <Header>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px"
          }}
        >
          Project
          <div>{timeBlock && timeBlock.taskInfo.projectInfo.name}</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "10px",
            marginBottom: "20px"
          }}
        >
          Task
          <div>{timeBlock && timeBlock.taskInfo.name}</div>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap"
          }}
        >
          <div
            style={{
              width: "100px",
              marginLeft: "10px",
              paddingRight: "10px"
            }}
          >
            <div>Year</div>
            <div>
              {timeBlock && moment(timeBlock.start_time).format("YYYY")}
            </div>
          </div>
          <div style={{ width: "100px", marginLeft: "10px" }}>
            <div>Date</div>
            <div>
              {timeBlock && moment(timeBlock.start_time).format("MM/DD")}
            </div>
          </div>
          <div
            style={{
              width: "180px",
              paddingLeft: "20px",
              paddingRight: "0"
            }}
          >
            <div>Start Time</div>
            <div>
              {timeBlock && moment(timeBlock.start_time).format("HH:mm a")}
            </div>
          </div>
          <div
            style={{
              width: "180px",
              paddingLeft: "20px",
              paddingRight: "20px"
            }}
          >
            <div>End Time</div>
            <div>
              {timeBlock && moment(timeBlock.end_time).format("HH:mm a")}
            </div>
          </div>
          <div style={{ width: "100px" }}>
            <div>Hours</div>
            <div>
              {timeBlock &&
                parseFloat(
                  moment(timeBlock.end_time).diff(
                    moment(timeBlock.start_time),
                    "hours",
                    true
                  )
                ).toFixed(2)}
            </div>
          </div>
          <div style={{ marginLeft: "20px" }}>
            <div>Status</div>
            <div>{timeBlock && timeBlock.status}</div>
          </div>
        </div>
      </Header>
    </Form>
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
