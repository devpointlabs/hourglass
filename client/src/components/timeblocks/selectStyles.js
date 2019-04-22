const selectStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "white" : "black",
    background: state.isSelected ? "lightgrey" : "white",
    "&:hover": { background: "rebeccapurple", color: "white" }
  }),

  control: (base, state) => ({
    ...base,
    borderColor: "gray",
    "&:hover": { borderColor: "gray" },
    boxShadow: "none"
    // You can also use state.isFocused to conditionally style based on the focus state
  })
};

export default selectStyles;
