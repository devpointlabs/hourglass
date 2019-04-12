import React from "react";
import { Button, Checkbox } from "semantic-ui-react";

class Footer extends React.Component {
  render() {
    return (
      <>
        <div style={{ marginLeft: "1000px", marginTop: "10px" }}>
          <Button color="green" floated="right" style={{ marginRight: "78px" }}>
            Submit
          </Button>
        </div>
      </>
    );
  }
}

export default Footer;
