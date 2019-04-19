class Timeblock < ApplicationRecord
  belongs_to :user
  belongs_to :task

  def self.weekly_project_hours(user_id)
    find_by_sql(["
      WITH cte AS (
        SELECT DATE_PART('hour', timeblocks.end_time - timeblocks.start_time) AS hours, u.name AS user_name, t.name AS task_name, t.id AS task_id
              FROM timeblocks
              LEFT JOIN users AS u 
              ON u.id = timeblocks.user_id
              LEFT JOIN tasks AS t 
              ON timeblocks.task_id = t.id
              WHERE timeblocks.start_time BETWEEN NOW()::DATE-EXTRACT(DOW FROM NOW())::INTEGER-7
              AND NOW()::DATE-EXTRACT(DOW FROM NOW())::INTEGER   
              AND u.id = #{user_id}
        )
        SELECT sum(hours) AS weekly_project_hours
        FROM cte
    "])
  end

  def self.user_pending_timeblocks(user_id)
find_by_sql(["
SELECT t.*, ta.name AS task_name, ta.project_id, p.name AS project_name, u.name,
(DATE_PART('hour', t.end_time - t.start_time)*60 + date_part('minute',t.end_time - t.start_time))/ 60 AS hours
FROM timeblocks AS t
LEFT JOIN tasks AS ta
ON ta.id = t.task_id
LEFT JOIN projects AS p 
ON p.id = ta.project_id
LEFT JOIN users as u 
ON u.id = t.user_id
WHERE t.status = 'pending' AND t.user_id = ?
ORDER BY t.start_time", user_id]).map do |t|
  {
    id: t.id,
    project_name: t.project_name,
    task_name: t.task_name,
    name: t.name,
    start_time: t.start_time.strftime("%a %b %d, %y %I:%M %p"),
    end_time: t.end_time.strftime("%a %b %d, %y %I:%M %p"),
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
(DATE_PART('hour', timeblocks.end_time - timeblocks.start_time)*60 + date_part('minute',timeblocks.end_time - timeblocks.start_time))/ 60 AS hours
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
    start_time: t.start_time.strftime("%a %b %d, %y %I:%M %p"),
    end_time: t.end_time.strftime("%a %b %d, %y %I:%M %p"),
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

def self.timeblocks_by_task(task_id)
#  select("
#     u.name,
#     timeblocks.start_time,
#     timeblocks.end_time,
#     DATE_PART('hour', timeblocks.end_time - timeblocks.start_time) AS hours,
#     timeblocks.id AS timeblock_id")
# .joins("
#     LEFT JOIN users AS u
# ON timeblocks.user_id = u.id")
# .where("timeblocks.id = task_id")
Timeblock.find_by_sql("SELECT 
u.name,
t.start_time,
t.end_time,
(DATE_PART('hour', t.end_time - t.start_time)*60 + date_part('minute',t.end_time - t.start_time))/ 60 AS hours,
t.id AS timeblock_id
FROM 
timeblocks AS t 
LEFT JOIN 
users AS u
ON 
t.user_id = u.id
WHERE 
t.id = #{task_id}")
 
end


def self.approve_pending_timeblocks
  find_by_sql("
  update timeblocks
  set status = 'approved'
  where status = 'pending'
  ")
end
end
