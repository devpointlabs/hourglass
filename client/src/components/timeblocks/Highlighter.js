import moment from "moment";

export const mondayHighLighted = (monday, selectedDate) => {
  if (moment(monday).format("dd ") === moment(selectedDate).format("dd"))
    return true;
  else return false;
};

export const tuesdayHighLighted = (monday, selectedDate) => {
  if (
    moment(monday)
      .add(1, "days")
      .format("dd ") === moment(selectedDate).format("dd")
  )
    return true;
  else return null;
};

export const wednesdayHighLighted = (monday, selectedDate) => {
  if (
    moment(monday)
      .add(2, "days")
      .format("dd ") === moment(selectedDate).format("dd")
  )
    return true;
  else return false;
};

export const thursdayHighLighted = (monday, selectedDate) => {
  if (
    moment(monday)
      .add(3, "days")
      .format("dd ") === moment(selectedDate).format("dd")
  )
    return true;
  else return false;
};

export const fridayHighLighted = (monday, selectedDate) => {
  if (
    moment(monday)
      .add(4, "days")
      .format("dd ") === moment(selectedDate).format("dd")
  )
    return true;
  else return false;
};

export const saturdayHighLighted = (monday, selectedDate) => {
  if (
    moment(monday)
      .add(5, "days")
      .format("dd ") === moment(selectedDate).format("dd")
  )
    return true;
  else return false;
};

export const sundayHighLighted = (monday, selectedDate) => {
  if (
    moment(monday)
      .add(6, "days")
      .format("dd ") === moment(selectedDate).format("dd")
  )
    return true;
  else return false;
};
