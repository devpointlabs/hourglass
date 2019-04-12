export const sortSelectOptions = (selectedProject, projects, tasks) => {
  const projectSelectOptions = projects.map(p => ({
    value: p.id,
    label: `${p.name} (${p.client_name})`
  }));

  const selectedProjectTasks = tasks.filter(
    t => t.project_id === selectedProject.value
  );

  const taskSelectOptions = selectedProjectTasks.map(t => ({
    value: t.id,
    label: t.name
  }));

  return { projectSelectOptions, taskSelectOptions };
};

export const defaultProjectAndTask = (task_id, selectOptions) => {
  const task = selectOptions.tasks.filter(t => task_id === t.id);
  const project_id = task[0].project_id;
  const project = selectOptions.projects.filter(p => project_id === p.id);
  return { defaultProject: project, defaultTask: task };
};
