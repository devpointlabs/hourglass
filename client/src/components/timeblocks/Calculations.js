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
