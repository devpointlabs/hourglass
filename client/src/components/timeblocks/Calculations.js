import moment from "moment";

export const CalculateHoursAndWeek = blocks => {
  return blocks.map(b => {
    return {
      ...b,
      hours: moment(b.end_time)
        .diff(b.start_time, "hours", true)
        .toPrecision(4),
      weekNumber: moment(b.start_time).format("YYYY w")
    };
  });
};

export const AddProjectInfoToTasks = (projects, tasks) => {
  return tasks.map(t => {
    return {
      ...t,
      projectInfo: projects
        .filter(p => p.id === t.project_id)
        .reduce((acc, project) => acc + project)
    };
  });
};

//needs some work
export const returnHoursSplitByDay = (week, selectedDay, setHoursFunction) => {
  let mondayTimeBlocks;
  let tuesdayTimeBlocks;
  let wednesdayTimeBlocks;
  let thursdayTimeBlocks;
  let fridayTimeBlocks;
  let saturdayTimeBlocks;
  let sundayTimeBlocks;
  debugger;
  if (week)
    mondayTimeBlocks = week.start_time.filter(
      wtb => moment(wtb).format("dd") === moment(selectedDay).format("dd")
    );
  tuesdayTimeBlocks = week.start_time.filter(
    wtb =>
      moment(wtb).format("dd") ===
      moment(selectedDay)
        .add(1, "days")
        .format("dd")
  );
  wednesdayTimeBlocks = week.start_time.filter(
    wtb =>
      moment(wtb).format("dd") ===
      moment(selectedDay)
        .add(2, "days")
        .format("dd")
  );
  thursdayTimeBlocks = week.start_time.filter(
    wtb =>
      moment(wtb).format("dd") ===
      moment(selectedDay)
        .add(3, "days")
        .format("dd")
  );
  fridayTimeBlocks = week.start_time.filter(
    wtb =>
      moment(wtb).format("dd") ===
      moment(selectedDay)
        .add(4, "days")
        .format("dd")
  );
  saturdayTimeBlocks = week.start_time.filter(
    wtb =>
      moment(wtb).format("dd") ===
      moment(selectedDay)
        .add(5, "days")
        .format("dd")
  );
  sundayTimeBlocks = week.start_time.filter(
    wtb =>
      moment(wtb).format("dd") ===
      moment(selectedDay)
        .add(6, "days")
        .format("dd")
  );
  debugger;
  // let mondayHours = mondayTimeBlocks.reduce((sum, ))
  // setHoursFunction(mondayHours, tuesdayHours, wednesdayHours, thursdayHours, fridayHours, saturdayHours, sundayHours)
};

// const totalYears = pilots.reduce((acc, pilot) => acc + pilot.years, 0);
