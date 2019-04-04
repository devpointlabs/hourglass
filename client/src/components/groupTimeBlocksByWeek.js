import moment from "moment";

const groupTimeBlocksByWeek = (blocks, startDate, endDate) => {
  const blocksAfterStartDate = blocks.filter(t =>
    moment(t.start_date)
      .startOf("day")
      .isAfter(startDate)
  );

  let blocksInDateRange = [];

  if (endDate !== "Unlimited")
    blocksInDateRange = blocksAfterStartDate.filter(t =>
      moment(t.start_date)
        .add(1, "day")
        .startOf("day")
        .isBefore(endDate)
    );
  else blocksInDateRange = blocksAfterStartDate;

  let weekDayNumber = moment(startDate).isoWeekday();
  let daysToSubtractToGetToMonday = 1 - weekDayNumber;
  let firstWeekStartDate = moment(startDate).add(
    daysToSubtractToGetToMonday,
    "days"
  );

  let weekStart = moment(firstWeekStartDate).format("YYYY-MM-DD");
  let weekEnd = moment(weekStart)
    .add(6, "days")
    .format("YYYY-MM-DD");
  let title = `Week of ${weekStart} to ${weekEnd}`;
  let endOfLastWeek = moment(endDate)
    .add(7, "days")
    .format("YYYY-MM-DD");

  if (endDate === "Unlimited") {
    endOfLastWeek = moment(new moment())
      .add(7, "days")
      .endOf("day")
      .format("YYYY-MM-DD");
  }

  const weeks = [];

  while (moment(weekEnd).isBefore(endOfLastWeek)) {
    weeks.push({
      title: title,
      weekStart: weekStart,
      weekEnd: weekEnd,
      weekBlocks: []
    });

    weekStart = moment(weekStart)
      .add(7, "days")
      .format("YYYY-MM-DD");
    weekEnd = moment(weekStart)
      .add(6, "days")
      .format("YYYY-MM-DD");
    title = `Week of ${weekStart} to ${weekEnd}`;
  }

  weeks.forEach(week => {
    blocksInDateRange.forEach(block => {
      let startDay = moment(block.start_time)
        .startOf("day")
        .format("YYYY-MM-DD");
      if (
        moment(startDay).isSameOrAfter(week.weekStart) &&
        moment(startDay).isSameOrBefore(week.weekEnd)
      ) {
        week.weekBlocks.push(block);
      }
    });
  });

  weeks.forEach(week => {
    week.hours = calculatedHours(week);
  });
  console.log(weeks);
  return weeks;
};

export default groupTimeBlocksByWeek;

const calculatedHours = week => {
  if (week.weekBlocks.length > 0) {
    const billable = 10;
    let filtered = week.weekBlocks.filter(b => b.billable);
    let filteredConvertToFloat = filtered.map(b => parseFloat(b));
    console.log(filteredConvertToFloat);
    // console.log(filteredConvertToFloat && filteredConvertToFloat.reduce());
    // const weekTotalHours = week.weekBlocks
    //   .map(b => (b.totalHours ? parseFloat(b.totalHours) : 0))
    //   .reduce();
    // console.log(weekTotalHours);
    // const billable = week.weekBlocks.map(b => b.billable).reduce();
    // const unbillable = week.weekBlocks.map(b => b.unbillable).reduce();
    // const totalHours = billable + unbillable;
    // const hours = {
    //   billable: billable,
    //   unbillable: unbillable,
    //   totalHours: totalHours
    // };
    // return hours;
  }
};
