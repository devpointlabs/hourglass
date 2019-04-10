import React from "react";
import { Table, Button, Form } from "semantic-ui-react";
import moment from "moment";
import styled from "styled-components";

class NewRowForm extends React.Component {
  state = {
    mondayTotal: "",
    tuesdayTotal: "",
    wednesdayTotal: "",
    thursdayTotal: "",
    fridayTotal: "",
    saturdayTotal: "",
    sundayTotal: "",
    weekTotal: "",
    project: ""
  };

  handleChange = e => {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => this.compileTotals()
    );
  };

  compileTotals = () => {
    const {
      mondayTotal,
      tuesdayTotal,
      wednesdayTotal,
      thursdayTotal,
      fridayTotal,
      saturdayTotal,
      sundayTotal
    } = this.state;
    this.setState({
      weekTotal: parseFloat(
        mondayTotal +
          tuesdayTotal +
          wednesdayTotal +
          thursdayTotal +
          fridayTotal +
          saturdayTotal +
          sundayTotal
      )
    });
  };

  handleSubmit = e => {
    e.preventDefault();
  };

  render() {
    return (
      <Table.Row>
        <Table.Cell>
          <Selector>
            <Form.Select
              style={{ width: "10ch", padding: "1px", borderRadius: 0 }}
              name="project"
              options={[
                { key: 1, text: "Project 1", value: "Project 1" },
                { key: 2, text: "Project 2", value: "Project 2" },
                { key: 3, text: "Project 3", value: "Project 3" },
                { key: 4, text: "Project 4", value: "Project 4" },
                { key: 5, text: "Project 5", value: "Project 5" },
                { key: 6, text: "Project 6", value: "Project 6" }
              ]}
              value={this.state.project}
              onChange={this.handleChange}
              placeholder="project"
            />
          </Selector>
        </Table.Cell>
        <Table.Cell />
        <Table.Cell>
          <Form.Input
            style={{ width: "10ch", padding: "1px", borderRadius: 0 }}
            name="mondayTotal"
            value={this.state.mondayTotal}
            onChange={this.handleChange}
            placeholder="0.00"
            maxLength="5"
            type="float"
          />
        </Table.Cell>
        <Table.Cell>
          <Form.Input
            style={{ width: "10ch", padding: "1px", borderRadius: 0 }}
            name="tuesdayTotal"
            value={this.state.tuesdayTotal}
            onChange={this.handleChange}
            placeholder="0.00"
            maxLength="5"
          />
        </Table.Cell>
        <Table.Cell>
          <Form.Input
            style={{ width: "10ch", padding: "1px", borderRadius: 0 }}
            name="wednesdayTotal"
            value={this.state.wednesdayTotal}
            onChange={this.handleChange}
            placeholder="0.00"
            maxLength="5"
          />
        </Table.Cell>
        <Table.Cell>
          <Form.Input
            style={{ width: "10ch", padding: "1px", borderRadius: 0 }}
            name="thursdayTotal"
            value={this.state.thursdayTotal}
            onChange={this.handleChange}
            placeholder="0.00"
            maxLength="5"
          />
        </Table.Cell>
        <Table.Cell>
          <Form.Input
            style={{ width: "10ch", padding: "1px", borderRadius: 0 }}
            name="fridayTotal"
            value={this.state.fridayTotal}
            onChange={this.handleChange}
            placeholder="0.00"
            maxLength="5"
          />
        </Table.Cell>
        <Table.Cell>
          <Form.Input
            style={{ width: "10ch", padding: "1px", borderRadius: 0 }}
            name="saturdayTotal"
            value={this.state.saturdayTotal}
            onChange={this.handleChange}
            placeholder="0.00"
            maxLength="5"
          />
        </Table.Cell>
        <Table.Cell>
          <Form.Input
            style={{ width: "10ch", padding: "1px", borderRadius: 0 }}
            name="sundayTotal"
            value={this.state.sundayTotal}
            onChange={this.handleChange}
            placeholder="0.00"
            maxLength="5"
          />
        </Table.Cell>
        <Table.Cell>{this.state.weekTotal}</Table.Cell>

        <Table.Cell>
          <Button>X</Button>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default NewRowForm;

const Selector = styled.div`
  .ui.selection.dropdown {
    min-width: 10em;
    padding: 0;
  }
`;
