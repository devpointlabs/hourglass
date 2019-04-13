import React from "react";
import { Button, Table } from "semantic-ui-react";

class Footer extends React.Component {
  render() {
    return (
      <>
        <Table.Row style={{ background: "#e2e2e2" }}>
          <Table.Cell />
          <Table.Cell />
          <Table.Cell />
          <Table.Cell />
          <Table.Cell />
          <Table.Cell>
            <Button
              floated="right"
              style={{
                marginRight: "10px",
                background: "RebeccaPurple",
                color: "white"
              }}
              onClick={() => this.props.submitTimeBlocks()}
            >
              Submit
            </Button>
          </Table.Cell>
        </Table.Row>
      </>
    );
  }
}

export default Footer;
