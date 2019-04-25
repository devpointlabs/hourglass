import React from "react";
import { Modal, Icon, Button } from "semantic-ui-react";
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
    this.props.getProjects && this.props.getProjects();
    this.props.getProject && this.props.getProject();
  };
  handleOpen = () => {
    this.setState({ modalOpen: true });
  };

  openModal2 = () => {
    this.setState({ modalOpen2: true, modalOpen: false });
  };

  closeModal2 = () => {
    this.setState({ modalOpen2: false });
    this.props.getProjectTasks && this.props.getProjectTasks()
  };

  openModal3 = () => {
    this.setState({ modalOpen3: true, modalOpen2: false });
  };

  closeModal3 = () => {
    this.setState({ modalOpen3: false });
    this.props.getProjects && this.props.getProjects();
  };

  render() {
    return (
      <>
        {this.props.taskView && (
          <Button
            onClick={this.openModal2}
            floated="right"
            style={{ background: "rebeccaPurple", color: "white" }}
          >
            Add/Edit Tasks
          </Button>
        )}
        {!this.props.budget && this.props.getProjects ? (
          <Icon
            name="cog"
            size="large"
            style={{ color: "RebeccaPurple" }}
            onClick={() => this.handleOpen()}
          />
        ) : (
            <div onClick={() => this.handleOpen()}>{this.props.projectInfo}</div>
          )}
        {this.props.budget && (
          <div onClick={() => this.handleOpen()} style={{ cursor: "pointer" }}>
            ${this.props.budget}
          </div>
        )}
        <Modal
          open={this.state.modalOpen}
          onClose={() => this.handleClose()}
          style={{ maxWidth: "100%" }}
        >
          <Modal.Header style={{ background: "RebeccaPurple", color: "white" }}>
            Edit {this.props.project.project_name}
          </Modal.Header>
          <Modal.Content>
            <EditProject
              openModal2={this.openModal2}
              handleClose={this.handleClose}
              project={this.props.project}
              budget={this.props.budget}
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
            <EditTaskTable
              closeModal2={this.closeModal2}
              openModal3={this.openModal3}
              project={this.props.project}
              taskView={this.props.taskView}
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
