import moment from "moment";

export const CalculateHoursAndWeek = blocks => {
  return blocks.map(b => {
    return {
      ...b,
      hours: moment(b.end_time ? b.end_time : moment())
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

export const AddUserInfoToBlocks = (blocks, users) => {
  return blocks.map(b => {
    return {
      ...b,
      userInfo: users
        .filter(u => u.id === b.user_id)
        .reduce((acc, user) => acc + user)
    };
  });
};
