import moment from "moment";

export const returnHoursSplitByDay = (week, monday) => {
  let mondayTimeBlocks = week.filter(
    wtb => moment(wtb.start_time).format("dd") === "Mo"
    //moment(monday).format("dd")
  );
  let tuesdayTimeBlocks = week.filter(
    wtb => moment(wtb.start_time).format("dd") === "Tu"
    // moment(monday)
    //   .add(1, "days")
    //   .format("dd")
  );
  let wednesdayTimeBlocks = week.filter(
    wtb => moment(wtb.start_time).format("dd") === "We"
    // moment(monday)
    //   .add(2, "days")
    //   .format("dd")
  );
  let thursdayTimeBlocks = week.filter(
    wtb => moment(wtb.start_time).format("dd") === "Th"
    // moment(monday)
    //   .add(3, "days")
    //   .format("dd")
  );
  let fridayTimeBlocks = week.filter(
    wtb => moment(wtb.start_time).format("dd") === "Fr"
    // moment(monday)
    //   .add(4, "days")
    //   .format("dd")
  );
  let saturdayTimeBlocks = week.filter(
    wtb => moment(wtb.start_time).format("dd") === "Sa"
    // moment(monday)
    //   .add(5, "days")
    //   .format("dd")
  );
  let sundayTimeBlocks = week.filter(
    wtb => moment(wtb.start_time).format("dd") === "Su"
    // moment(monday)
    //   .add(6, "days")
    //   .format("dd")
  );
  let mondayHours = mondayTimeBlocks.reduce(
    (sum, block) => sum + parseFloat(block.hours),
    0
  );
  let tuesdayHours = tuesdayTimeBlocks.reduce(
    (sum, block) => sum + parseFloat(block.hours),
    0
  );
  let wednesdayHours = wednesdayTimeBlocks.reduce(
    (sum, block) => sum + parseFloat(block.hours),
    0
  );
  let thursdayHours = thursdayTimeBlocks.reduce(
    (sum, block) => sum + parseFloat(block.hours),
    0
  );
  let fridayHours = fridayTimeBlocks.reduce(
    (sum, block) => sum + parseFloat(block.hours),
    0
  );
  let saturdayHours = saturdayTimeBlocks.reduce(
    (sum, block) => sum + parseFloat(block.hours),
    0
  );
  let sundayHours = sundayTimeBlocks.reduce(
    (sum, block) => sum + parseFloat(block.hours),
    0
  );

  let total =
    mondayHours +
    tuesdayHours +
    wednesdayHours +
    thursdayHours +
    fridayHours +
    saturdayHours +
    sundayHours;
  return {
    mondayHours,
    tuesdayHours,
    wednesdayHours,
    thursdayHours,
    fridayHours,
    saturdayHours,
    sundayHours,
    total
  };
};
