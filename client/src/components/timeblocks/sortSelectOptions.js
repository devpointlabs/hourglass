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
