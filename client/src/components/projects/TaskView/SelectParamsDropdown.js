import React from 'react'

class SelectParamsDropdown extends React.Compnent {
  state = {
    key: 'allTime',
    text: 'All Time',
    value: 'allTime'
  }

  render() {
    return (
      <>

      </>
    )
  }
}

<Dropdown
  placeholder="Teammates"
  fluid
  multiple
  selection
  options={options}
  style={{ borderRadius: 0 }}
/>;

const options = [
  { key: "allTime", text: "All Time", value: "allTime" },
  { key: "thisWeek", text: "This Week", value: "thisWeek" },
  { key: "thisMonth", text: "This Month", value: "ThisMonth" },

];
