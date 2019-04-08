import React from "react";
import { Table, Header, Image, Button } from "semantic-ui-react";
import moment from "moment";

const TimeBlock = ({
  data: {
    id,
    project_id,
    name,
    date,
    start_time,
    end_time,
    totalTime,
    billable,
    unbillable
  },
  toggleEditMode,
  stop,
  start
}) => (
  <Table.Row style={{ padding: 0 }}>
    <Table.Cell style={{ ...styles.cell, paddingLeft: "4%" }}>
      <Header as="h4" image>
        <Image
          src="https://react.semantic-ui.com/images/avatar/small/lena.png"
          rounded
          size="mini"
        />
        <Header.Content>
          Project Name
          <Header.Subheader>Team Name</Header.Subheader>
        </Header.Content>
      </Header>
    </Table.Cell>
    <Table.Cell style={styles.cell}>
      {start_time && moment(start_time).format("MM/DD")}
    </Table.Cell>
    <Table.Cell style={styles.cell}>
      {start_time && moment(start_time).format("h:mm a")}
    </Table.Cell>
    <Table.Cell style={styles.cell}>
      {end_time && moment(end_time).format("h:mm a")}
    </Table.Cell>
    <Table.Cell style={styles.cell}>
      {end_time &&
        moment
          .utc(
            moment
              .duration(moment(end_time).diff(moment(start_time)))
              .asMilliseconds()
          )
          .format("HH.mm.ss")}
    </Table.Cell>
    <Table.Cell style={styles.cell}>{billable}</Table.Cell>
    <Table.Cell style={styles.cell}>{unbillable}</Table.Cell>
    <Table.Cell style={styles.cell}>
      {!start_time && (
        <Button color="green" inverted onClick={() => start()}>
          Start
        </Button>
      )}
      {!end_time && start_time && (
        <Button color="red" inverted onClick={() => stop(id)}>
          End
        </Button>
      )}
    </Table.Cell>
    <Table.Cell style={styles.cell}>
      <Button
        onClick={() => toggleEditMode()}
        name="edit"
        color="blue"
        circular
        size="tiny"
        icon="edit"
      />
    </Table.Cell>
  </Table.Row>
);

const styles = {
  cell: {
    paddingTop: "3px",
    paddingBottom: "3px"
  }
};

export default TimeBlock;
