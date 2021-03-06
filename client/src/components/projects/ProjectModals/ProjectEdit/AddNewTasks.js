import React from "react";
import {
  Form,
  Button,
  Checkbox,
  Table,
} from "semantic-ui-react";
import axios from "axios";

class AddNewTasks extends React.Component {
  state = {
    task: {
      name: "",
      description: "",
      billable: false,
      price_per_hour: "",
      project_id: this.props.project.project_id
    },
    checkboxStatus: false
  };

  handleSubmit = () => {
    const { task } = this.state;
    const { project } = this.props;
    axios
      .post(`/api/projects/${project.project_id}/tasks`, { task })
      .then(res => {
        this.setState(
          {
            task: {
              ...this.state.task,
              name: "",
              description: "",
              billable: false,
              price_per_hour: ""
            },
            checkboxStatus: false
          },
          () => {
            this.props.getProjectTasks()

          }
        );
      });
  };

  handleBillable = () => {
    this.setState({
      checkboxStatus: !this.state.checkboxStatus,
      task: { ...this.state.task, billable: !this.state.task.billable }
    });
  };

  handleChange = e => {
    const {
      target: { name, value }
    } = e;
    this.setState({ task: { ...this.state.task, [name]: value } });
  };

  handleDropdown = (e, { name, value }) => {
    this.setState({ task: { ...this.state.task, [name]: value } })
  }

  render() {
    const { name, description, price_per_hour } = this.state.task;

    return (
      <>
        <Form style={styles.modal}>
          <Table>
            <Table.Body>
              <Table.Row key={"new"}>
                <Table.Cell>
                  <Form.Input
                    name="name"
                    label="Name"
                    placeholder="Task Name"
                    value={name}
                    autoFocus
                    // required
                    onChange={this.handleChange}
                  />
                  {/* <Dropdown
                    clearable
                    options={options}
                    selection
                    placeholder='Default Tasks...'
                    onChange={this.handleDropdown}
                    value={name}
                    name='name'

                  /> */}
                </Table.Cell>
                <Table.Cell>
                  <Form.Input
                    name="description"
                    label="Description"
                    placeholder="Description"
                    value={description}
                    onChange={this.handleChange}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Form.Input
                    name="price_per_hour"
                    label="Price per hour"
                    placeholder="Price per hour"
                    value={price_per_hour}
                    type="number"
                    onChange={this.handleChange}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Checkbox
                    style={{ marginTop: "22px" }}
                    label="Billable"
                    onClick={this.handleBillable}
                    checked={this.state.checkboxStatus}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Button
                    circular
                    style={{
                      marginTop: "20px",
                      background: "RebeccaPurple",
                      color: "white"
                    }}
                    onClick={() => this.handleSubmit()}
                    size="mini"
                    icon="plus"
                  />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Form>
      </>
    );
  }
}

export default AddNewTasks;

const styles = {
  modal: {
    position: "relative",
    maxWidth: "100%",
    textAlign: "center",
    padding: "20px"
  }
};
