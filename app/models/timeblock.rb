class Timeblock < ApplicationRecord
  belongs_to :user
  belongs_to :task

  def self.pending_timeblocks
#     find_by_sql("
#     SELECT t.*, ta.name AS task_name, ta.project_id, p.name AS project_name, u.name
# FROM timeblocks AS t
# LEFT JOIN tasks AS ta
# ON ta.id = t.task_id
# LEFT JOIN projects AS p 
# ON p.id = ta.project_id
# LEFT JOIN users as u 
# ON u.id = t.user_id
# WHERE t.status = 'pending'
# ORDER BY t.start_time
#     ")
select("
timeblocks.*, 
ta.name AS task_name, 
ta.project_id, 
p.name AS project_name, 
u.name,
timeblocks.end_time - timeblocks.start_time AS hours
")
.joins("
LEFT JOIN tasks AS ta
ON ta.id = timeblocks.task_id
LEFT JOIN projects AS p 
ON p.id = ta.project_id
LEFT JOIN users as u 
ON u.id = timeblocks.user_id
")
.where("
timeblocks.status = 'pending'
")
.order("
timeblocks.start_time
").map do |t|
  {
    id: t.id,
    project_name: t.project_name,
    task_name: t.task_name,
    name: t.name,
    start_time: t.start_time.strftime("%a %B %d, %Y %I:%M %p"),
    end_time: t.end_time.strftime("%a %B %d, %Y %I:%M %p"),
    created_at: t.created_at,
    updated_at: t.updated_at,
    user_id: t.user_id,
    task_id: t.task_id,
    status: t.status,
    manualEntry: t.manualEntry,
    hours: t.hours,
  }
end
end
end
