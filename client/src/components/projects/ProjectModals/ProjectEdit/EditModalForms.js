import React from "react";
import { Modal, Icon } from "semantic-ui-react";
import EditProject from "./EditProject";
import EditTaskTable from "./EditTaskTable";
import EditTeamModalv2 from "../../EditTeamModalv2";

class EditModalForms extends React.Component {
  state = {
    modalOpen: false,
    modalOpen2: false,
    modalOpen3: false
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
    this.props.getProjects();
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

  render() {
    return (
      <>
        <Icon
          name="cog"
          style={{ color: "RebeccaPurple" }}
          onClick={() => this.handleOpen()}
        />
        <Modal
          open={this.state.modalOpen}
          onClose={() => this.handleClose()}
          style={{ width: "700px" }}
        >
          <Modal.Header style={{ background: "RebeccaPurple", color: "white" }}>
            Edit {this.props.project.project_name}
          </Modal.Header>
          <Modal.Content>
            <EditProject
              openModal2={this.openModal2}
              handleClose={this.handleClose}
              project={this.props.project}
            />
          </Modal.Content>
        </Modal>
        <Modal
          open={this.state.modalOpen2}
          onClose={() => this.closeModal2()}
          style={{ width: "850px" }}
        >
          <Modal.Header style={{ background: "RebeccaPurple", color: "white" }}>
            Add Tasks
          </Modal.Header>
          <Modal.Content>
            <EditTaskTable
              closeModal2={this.closeModal2}
              openModal3={this.openModal3}
              project={this.props.project}
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
              project_id={this.props.project.project_id}
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

export default EditModalForms;
