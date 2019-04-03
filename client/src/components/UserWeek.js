import React from "react";
import TimeBlockForm from "./TimeBlockForm";
import { Table, Icon } from "semantic-ui-react";

const UserWeek = ({
  week,
  data,
  updateTimeBlocks,
  addTimeBlock,
  deleteTimeBlock
}) => (
  <>
    <Table.Row>
      <Table.Cell colSpan="9">
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          <Icon name="sort down" />
          'week of 4/1/2019-4/8/2019'
          <div
            style={{
              width: "55%",
              background: "green",
              height: "12px",
              borderRadius: "10px"
            }}
          />
          40 hrs
        </div>
      </Table.Cell>
    </Table.Row>
    {week &&
      week.map(t => (
        <TimeBlockForm
          key={t.id}
          data={t}
          updateTimeBlocks={updateTimeBlocks}
          addTimeBlock={addTimeBlock}
          deleteTimeBlock={deleteTimeBlock}
        />
      ))}
  </>
);

export default UserWeek;
