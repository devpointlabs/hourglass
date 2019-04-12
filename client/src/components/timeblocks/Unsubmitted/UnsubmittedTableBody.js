import React from "react";
import UnsubmittedTableRow from "./UnsubmittedTableRow";
import UnsubmittedTableHeader from "./UnsubmittedTableHeader";
import { Table } from "semantic-ui-react";

const UnsubmittedTableBody = props => (
  <>
    <Table.Body>
      <UnsubmittedTableHeader />
      <UnsubmittedTableRow
        timeBlocks={props.timeBlocks}
        tasks={props.tasks}
        projects={props.projects}
        getTimeBlocks={props.getTimeBlocks}
      />
    </Table.Body>
  </>
);

export default UnsubmittedTableBody;
