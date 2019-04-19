# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  has_many :assignments
  has_many :projects, through: :assignments
  has_many :timeblocks

  def self.total_hours_per_project(id)
    find_by_sql(["
    WITH cte AS 
(
SELECT 
users.id,
users.name,
users.nickname,
users.image,
timeblocks.start_time,
timeblocks.end_time,
timeblocks.task_id,
tasks.project_id,
(DATE_PART('hour', timeblocks.end_time - timeblocks.start_time)*60 + date_part('minute',timeblocks.end_time - timeblocks.start_time))/ 60 AS hours
FROM users
LEFT JOIN timeblocks
ON timeblocks.user_id = users.id
LEFT JOIN tasks
ON tasks.id = timeblocks.task_id
LEFT JOIN projects
ON projects.id = tasks.project_id
WHERE projects.id = ?
),
total_user_hours AS (
SELECT 
cte.id,
SUM(hours) as total_hours
FROM cte
GROUP BY cte.id
)
SELECT
cte.project_id,
cte.name,
cte.id,
cte.nickname,
cte.image,
tuh.total_hours
FROM cte
LEFT JOIN total_user_hours AS tuh
ON cte.id = tuh.id
GROUP BY cte.id, cte.project_id, cte.name, cte.nickname, cte.image, tuh.total_hours
", id])
  end

  def self.total_task_hours(id)
    find_by_sql(["
      WITH cte AS (
        SELECT u.name AS user_name, 
          t.name AS task_name, 
          p.name AS project_name, 
          date_part('hour', tb.end_time - tb.start_time) AS hours, 
          t.id AS task_id,
          p.client_name
        FROM users AS u
        LEFT JOIN assignments AS a 
        ON u.id = a.user_id
        LEFT JOIN projects AS p 
        ON a.project_id = p.id
        LEFT JOIN tasks AS t 
        ON p.id = t.project_id
        LEFT JOIN timeblocks AS tb 
        ON tb.task_id = t.id
        WHERE u.id = #{id}
      )
      SELECT 
          sum(hours) AS total_task_hours, user_name, task_name, project_name, task_id, client_name
      FROM cte
      GROUP BY cte.user_name, cte.task_name, cte.project_name, cte.task_id, cte.client_name
    "])
  end
end

# find teams based on task_id, which a user and a project will have
