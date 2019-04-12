import React from "react";
import UnsubmittedTableRow from "./UnsubmittedTableRow";
import UnsubmittedTableHeader from "./UnsubmittedTableHeader";
import { Table } from "semantic-ui-react";

const UnsubmittedTableBody = props => (
  <>
    <UnsubmittedTableHeader />
    <Table.Body>
      <UnsubmittedTableRow
        timeBlocks={props.timeBlocks}
        tasks={props.tasks}
        projects={props.projects}
        getTimeBlocks={props.getTimeBlocks}
        handleCheckMarks={props.handleCheckMarks}
        reset={props.reset}
        handleOpen={props.handleOpen}
      />
    </Table.Body>
  </>
);

export default UnsubmittedTableBody;
