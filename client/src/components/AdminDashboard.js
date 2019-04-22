import React from "react";
import axios from "axios";
import { Table, Header, Image, Input } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { CalculateHoursAndWeek } from "./timeblocks/Calculations/Calculations";

const defaultImage = "https://d30y9cdsu7xlg0.cloudfront.net/png/15724-200.png";

class hoursTable extends React.Component {
  state = { users: [], userTimeBlocksByTask: [], projects: [] };

  componentDidMount() {
    axios
      .get("/api/users")
      .then(response => this.setState({ users: response.data }));
    axios.get("/api/users/timeblocks").then(res =>
      this.setState({
        userTimeBlocksByTask: res.data.map(r => ({
          name: r.name,
          userId: r.userId,
          timeBlock: r.timeBlocksByTask.map(tbbt =>
            CalculateHoursAndWeek(tbbt.blocks)
          )
        }))
      })
    );
    // this.setState({ timeblocks: (res.data.name + CalculateHoursAndWeek(res.data.timeBlocks)) })
    axios
      .get("/api/projects")
      .then(response => this.setState({ projects: response.data }));
  }

  render() {
    const userTimeBlock = this.state.userTimeBlocksByTask.map(u => u.timeBlock);

    const totals = userTimeBlock.map(
      tb =>
        tb.map(task =>
          task.reduce((acc, totalHours) => {
            return task.task_id === 1
              ? acc + parseFloat(totalHours.hours)
              : acc;
          })
        ),
      0
    );
    console.log(totals);

    const { projects } = this.state;
    return (
      <>
        <Table celled padded stackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell singleLine>Employees</Table.HeaderCell>
              {projects.map(p => (
                <Table.HeaderCell>
                  <Link to={`projects/${p.id}`} style={{ color: "black" }}>
                    {p.name}
                  </Link>
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.state.users.map(user => (
              <Table.Row>
                <Table.Cell size="small">
                  <Header as="h4">
                    <Image circular src={user.image || defaultImage} />
                    {user.name}
                  </Header>
                </Table.Cell>
                {/* {totals.map(x => (
                  <Table.Cell>
                    {x}
                  </Table.Cell>
                ))} */}
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </>
    );
  }
}

export default hoursTable;

{
  /* 
   // <Table definition size="small" striped>
      //   <Table.Header>
      //     <Table.Row>
      //       <Table.HeaderCell />
      //       {projects.map(p => (
      //         <Table.HeaderCell> */
}
{
  /* //           <Link to={`projects/${p.id}`} style={{ color: "black" }}>
      //             {p.name}
      //           </Link>

      //         </Table.HeaderCell> */
}
//       ))}

{
  /* //       <Table.HeaderCell>Total</Table.HeaderCell>
      //     </Table.Row>  */
}

{
  /* //       <Table.Row>{t}</Table.Row>
      //     ))}
      //   </Table.Header> */
}
{
  /* //   {this.state.users.map(user => (
      //     <Table.Body>
      //       <Table.Row>
      //         <Table.Cell size="small">
      //           <Header as="h4">
      //             <Image circular src={user.image || defaultImage} />
      //             {user.name}
      //           </Header>
      //         </Table.Cell>
      //         <Table.Cell>Total</Table.Cell>
      //       </Table.Row>
      //     </Table.Body>
      //   ))} */
}
//   {/* <Table.Body>
//     <Table.Row>
//       <Table.Cell>Total</Table.Cell>
//       {this.state.timeblocks.map(project => (
//         <Table.Cell>Total</Table.Cell>
//       ))}
//     </Table.Row>
//   </Table.Body> */}
{
  /* // </Table> */
}
