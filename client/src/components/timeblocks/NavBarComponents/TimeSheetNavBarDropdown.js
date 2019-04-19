import React from "react";
import { Dropdown } from "semantic-ui-react";

class TimeSheetNavbarDropdown extends React.Component {
  state = { teammates: "" };

  render() {
    return (
      <>

      </>
    );
  }
}

export default TimeSheetNavbarDropdown;

const options = [
  { key: "manny", text: "Manny", value: "manny" },
  { key: "mo", text: "Mo", value: "mo" },
  { key: "jack", text: "Jack", value: "jack" },
  { key: "john", text: "John", value: "john" },
  { key: "jake", text: "Jake", value: "jake" },
  { key: "jim", text: "Jim", value: "jim" },
  { key: "jerry", text: "Jerry", value: "jerry" },
  { key: "bob", text: "bob", value: "bob" },
  { key: "nick", text: "nick", value: "nick" },
  { key: "chirs", text: "chirs", value: "chirs" },
  { key: "ned", text: "ned", value: "ned" },
  { key: "niles", text: "niles", value: "niles" },
  { key: "miles", text: "miles", value: "miles" },
  { key: "heffer", text: "heffer", value: "heffer" },
  { key: "fatty", text: "fatty", value: "fatty" },
  { key: "buttface", text: "buttface", value: "buttface" },
  { key: "nice", text: "nice", value: "nice" },
  { key: "nerd", text: "nerd", value: "nerd" },
  { key: "loser", text: "loser", value: "loser" },
  { key: "coolguy", text: "coolguy", value: "coolguy" },
  { key: "josh", text: "josh", value: "josh" },
  { key: "kevin", text: "kevin", value: "kevin" },
  { key: "dave", text: "dave", value: "dave" },
  { key: "bill", text: "bill", value: "bill" }
];

///semantic reference below
////////////////////////////////////////////////

// export default class DropdownExampleSearchQuery extends Component {
//   state = { searchQuery: '' }

//   handleChange = (e, { searchQuery, value }) =>
//     this.setState({ searchQuery, value })

//   handleSearchChange = (e, { searchQuery }) => this.setState({ searchQuery })

//   render() {
//     const { searchQuery, value } = this.state

//     return (
//       <Dropdown
//         fluid
//         multiple
//         onChange={this.handleChange}
//         onSearchChange={this.handleSearchChange}
//         options={stateOptions}
//         placeholder='State'
//         search
//         searchQuery={searchQuery}
//         selection
//         value={value}
//       />
//     )
//   }
// }
