import moment from "moment";

export const CalculateHours = blocks => {
  return blocks.map(b => {
    return {
      ...b,
      hours: moment(b.end_time)
        .diff(b.start_time, "hours", true)
        .toPrecision(4)
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
export const returnHoursSplitByDay = (week, selectedDay) => {
  debugger;
  let mondayHours = week.start_time.filter(
    wtb => moment(wtb).format("dd") === moment(selectedDay).format("dd")
  );
  let tuesdayHours = week.start_time.filter(
    wtb =>
      moment(wtb).format("dd") ===
      moment(selectedDay)
        .add(1, "days")
        .format("dd")
  );
  let wednesdayHours = week.start_time.filter(
    wtb =>
      moment(wtb).format("dd") ===
      moment(selectedDay)
        .add(2, "days")
        .format("dd")
  );
  let thursdayHours = week.start_time.filter(
    wtb =>
      moment(wtb).format("dd") ===
      moment(selectedDay)
        .add(3, "days")
        .format("dd")
  );
  let fridayHours = week.start_time.filter(
    wtb =>
      moment(wtb).format("dd") ===
      moment(selectedDay)
        .add(4, "days")
        .format("dd")
  );
  let saturdayHours = week.start_time.filter(
    wtb =>
      moment(wtb).format("dd") ===
      moment(selectedDay)
        .add(5, "days")
        .format("dd")
  );
  let sundayHours = week.start_time.filter(
    wtb =>
      moment(wtb).format("dd") ===
      moment(selectedDay)
        .add(6, "days")
        .format("dd")
  );

  return (
    mondayHours,
    tuesdayHours,
    wednesdayHours,
    thursdayHours,
    fridayHours,
    saturdayHours,
    sundayHours
  );
};
