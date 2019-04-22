import React from "react";
import { Modal, Menu } from "semantic-ui-react";
import NewProject from "./NewProject";
import NewTaskTable from "./NewTaskTable";
import EditTeamModalv2 from "../../EditTeamModalv2";

class ModalForms extends React.Component {
  state = {
    modalOpen: false,
    modalOpen2: false,
    modalOpen3: false,
    project_id: "word"
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };
  handleOpen = () => {
    this.setState({ modalOpen: true });
  };

  openModal2 = () => {
    this.setState({ modalOpen2: true, modalOpen: false });
  };

  closeModal2 = () => {
    this.setState({ modalOpen2: false });
  };

  openModal3 = () => {
    this.setState({ modalOpen3: true, modalOpen2: false });
  };

  closeModal3 = () => {
    this.setState({ modalOpen3: false });
    this.props.getProjects();
  };

  setProjectId = project_id => {
    this.setState({ project_id: project_id });
  };

  render() {
    return (
      <>
        <Menu style={{ marginTop: "0" }}>
          <Menu.Item onClick={() => this.handleOpen()}>
            Add New Project
          </Menu.Item>
        </Menu>
        <Modal
          open={this.state.modalOpen}
          onClose={() => this.handleClose()}
          style={{ maxWidth: "100%" }}
        >
          <Modal.Header style={{ background: "RebeccaPurple", color: "white" }}>
            New Project
          </Modal.Header>
          <Modal.Content>
            <NewProject
              openModal2={this.openModal2}
              handleClose={this.handleClose}
              setProjectId={this.setProjectId}
              getProjects={this.props.getProjects}
            />
          </Modal.Content>
        </Modal>
        <Modal
          open={this.state.modalOpen2}
          onClose={() => this.closeModal2()}
          style={{ maxWidth: "100%" }}
        >
          <Modal.Header style={{ background: "RebeccaPurple", color: "white" }}>
            Add Tasks
          </Modal.Header>
          <Modal.Content>
            <NewTaskTable
              closeModal2={this.closeModal2}
              openModal3={this.openModal3}
              setProjectId={this.setProjectId}
            />
          </Modal.Content>
        </Modal>
        <Modal open={this.state.modalOpen3} onClose={() => this.closeModal3()}>
          <Modal.Header style={{ background: "rebeccapurple", color: "white" }}>
            <div>Add Team Members</div>
          </Modal.Header>
          <div>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  width: "50%",
                  textAlign: "left",
                  padding: "10px",
                  paddingLeft: "40px",
                  fontWeight: "bold"
                }}
              >
                Users
              </div>
              <div
                style={{
                  fontWeight: "bold",
                  width: "50%",
                  textAlign: "left",
                  padding: "10px"
                }}
              >
                Assigned To Project
              </div>
            </div>
          </div>
          <Modal.Content>
            <EditTeamModalv2
              users={this.state.users}
              project_id={this.state.project_id}
              handleClose={this.closeModal3}
              getUsersAndHours={this.closeModal3}
              users={[]}
              newProjectType={"newProjectType"}
            />
          </Modal.Content>
        </Modal>
      </>
    );
  }
}

export default ModalForms;
