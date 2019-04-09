import React from "react";
import { Table, Button } from "semantic-ui-react";

class NewRowForm extends React.Component {
  state = {};

  render() {
    return (
      <Table.Row>
        <>
          <Table.Cell>0</Table.Cell>
          <Table.Cell>1</Table.Cell>
          <Table.Cell>2</Table.Cell>
          <Table.Cell>3</Table.Cell>
          <Table.Cell>4</Table.Cell>
          <Table.Cell>5</Table.Cell>
          <Table.Cell>6</Table.Cell>
          <Table.Cell>7</Table.Cell>
          <Table.Cell>8</Table.Cell>
          <Table.Cell>9</Table.Cell>
        </>
        <Table.Cell>
          <Button>X</Button>
        </Table.Cell>
      </Table.Row>
    );
  }
}

export default NewRowForm;
