import React from 'react'
import { Dropdown } from 'semantic-ui-react'

class SelectParamsDropdown extends React.Component {
  state = {
    key: 'allTime',
    text: 'All Time',
    value: 'allTime'
  }

  render() {
    return (
      <Dropdown
        placeholder="Dates"
        fluid
        multiple
        selection
        options={options}
        style={{ borderRadius: 0 }}
      />
    )
  }
}


const options = [
  { key: "allTime", text: "All Time", value: "allTime" },
  { key: "thisWeek", text: "This Week", value: "thisWeek" },
  { key: "thisMonth", text: "This Month", value: "ThisMonth" },

];

export default SelectParamsDropdown