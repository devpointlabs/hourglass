import React from "react";
import { Button, Icon, Modal, Image, Header, Form } from "semantic-ui-react";
import Select from "react-select";

class addTimeBlockButton extends React.Component {
  state = { modalOpen: true, projectId: "", task: "" };

  handleChange1 = e => {
    this.setState({ projectId: e.value });
  };

  handleChange2 = e => {
    this.setState({ task: e.value });
  };

  render() {
    const selectedProjectTasks = this.props.tasks.filter(
      t => t.project_id === this.state.projectId
    );

    return (
      <Modal
        trigger={
          <Button
            style={{
              background: "RebeccaPurple",
              color: "white",
              borderRadius: 0,
              paddingLeft: "0",
              width: "4em",
              height: "4em",
              textAlign: "center"
            }}
            size="large"
            onClick={() => console.log("click")}
          >
            <Icon
              size="large"
              style={{ color: "white", paddingLeft: "22px" }}
              name="add"
            />
          </Button>
        }
      >
        <Modal.Header>Add Timesheet Entry</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form>
              <Header>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  Project
                  <Select
                    onChange={this.handleChange1}
                    options={this.props.projects.map(p => ({
                      value: p.id,
                      label: `${p.name} (${p.client_name})`
                    }))}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column"
                  }}
                >
                  Task
                  <Select
                    onChange={this.handleChange2}
                    options={selectedProjectTasks.map(t => ({
                      value: t.name,
                      label: t.name
                    }))}
                  />
                </div>
              </Header>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}
export default addTimeBlockButton;
