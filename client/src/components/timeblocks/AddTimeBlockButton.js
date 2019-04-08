import React from "react";
import {
  Button,
  Icon,
  Modal,
  Image,
  Header,
  Form,
  Checkbox
} from "semantic-ui-react";
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
                    flexDirection: "column",
                    padding: "10px"
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
                <div>
                  <Form.Group>
                    <Form.Input label="Start Time" name="startTime" />
                    <Form.Input label="End Time" name="endTime" />
                    <Form.Input label="Hours" name="hours" />
                    <button color="white" style={{ padding: "10px" }}>
                      <Icon name="clock" size="huge" style={{ margin: 0 }} />
                    </button>
                  </Form.Group>
                  <Checkbox
                    label="manually entered"
                    name="manualEnterCheckbox"
                  />
                </div>
              </Header>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button>Cancel</Button>
                <Button>Submit</Button>
              </div>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    );
  }
}
export default addTimeBlockButton;
