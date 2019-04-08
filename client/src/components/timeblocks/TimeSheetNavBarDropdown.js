import React from "react";
import { Dropdown } from "semantic-ui-react";

class TimeSheetNavbarDropdown extends React.Component {
  state = { teammates: "" };

  render() {
    return (
      <Dropdown
        placeholder="Teammates"
        fluid
        multiple
        selection
        options={options}
        style={{ borderRadius: 0 }}
      />
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
  { key: "jerry", text: "Jerry", value: "jerry" }
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
