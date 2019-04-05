import moment from "moment";

const convertMomentToSelectedDateString = momentDate =>
  moment(momentDate).format("dddd DD MMM");

export default convertMomentToSelectedDateString;
