import React from "react";
import TimeBlockForm from "./TimeBlockForm";
import { Table, Icon } from "semantic-ui-react";

const UserWeek = ({
  week,
  updateTimeBlocks,
  addTimeBlock,
  deleteTimeBlock
}) => (
  <>
    <Table.Row>
      <Table.Cell
        colSpan="9"
        style={{ paddingTop: "2px", paddingBottom: "2px" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div>
            <Icon name="sort down" />
            {week && week.title}
          </div>
          <div
            style={{
              width: "55%",
              background: "grey",
              height: "10px"
            }}
          >
            <div
              style={{
                width: "30%",
                background: "green",
                height: "10px"
              }}
            />
          </div>
          40 hrs
        </div>
      </Table.Cell>
    </Table.Row>
    {week &&
      week.weekBlocks.map(t => (
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
