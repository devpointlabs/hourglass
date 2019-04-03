import React from "react";
import { Table, Header, Image, Button } from "semantic-ui-react";
import StopWatch from "./StopWatch";
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
  <Table.Row>
    <Table.Cell>
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
    <Table.Cell>{start_time && moment(start_time).format("MM/DD")}</Table.Cell>
    <Table.Cell>{start_time && moment(start_time).format("h:mm a")}</Table.Cell>
    <Table.Cell>{end_time && moment(end_time).format("h:mm a")}</Table.Cell>
    <Table.Cell>
      {end_time &&
        moment
          .utc(
            moment
              .duration(moment(end_time).diff(moment(start_time)))
              .asMilliseconds()
          )
          .format("HH.mm.ss")}
    </Table.Cell>
    <Table.Cell>{billable}</Table.Cell>
    <Table.Cell>{unbillable}</Table.Cell>
    <Table.Cell>
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
    <Table.Cell>
      <Button onClick={() => toggleEditMode()}>Edit</Button>
    </Table.Cell>
  </Table.Row>
);

export default TimeBlock;
