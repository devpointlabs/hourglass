import React from "react";
import { Button, Table } from "semantic-ui-react";

class Footer extends React.Component {
  render() {
    return (
      <>
        <Table.Row style={{ background: "#e2e2e2" }}>
          <Button
            color="green"
            floated="right"
            style={{ marginRight: "30px" }}
            onClick={() => this.props.submitTimeBlocks()}
          >
            Submit
          </Button>
        </Table.Row>
      </>
    );
  }
}

export default Footer;
