class Project < ApplicationRecord
  has_many :tasks, dependent: :destroy
  has_many :assignments, dependent: :destroy
  has_many :users, through: :assignments

  def self.projects_with_data
    find_by_sql(
      "WITH cte AS (
      SELECT
          p.id AS project_id,
          t.id AS task_id,
          t.name AS task_name,
          t.price_per_hour,
          t.description,
          t.billable,
          t.project_id AS task_project_id,
          DATE_PART('hour', tb.end_time - tb.start_time) AS hours
      FROM tasks AS t
      INNER JOIN projects AS p
          ON p.id = t.project_id
      LEFT JOIN timeblocks AS tb
          ON t.id = tb.task_id
      INNER JOIN users AS u
          ON u.id = tb.user_id
      ORDER BY t.id
      )
      ,total_task_hours AS (
          SELECT 
              task_id,
              task_name,
              description,
              billable,
              price_per_hour,
              SUM(hours) as total_hours,
              CAST(price_per_hour AS FLOAT) * SUM(hours) AS total_cost,
              task_project_id
          FROM cte
          GROUP BY task_id, task_name, description, billable, price_per_hour, task_project_id
          )
          ,total_project_hours AS (
          SELECT 
              task_project_id,
              SUM(total_hours) as total_project_hours,
              SUM(total_cost) as total_project_cost
          FROM total_task_hours
          GROUP BY task_project_id
          )
      select
          tph.task_project_id as project_id,
          p.name as project_name,
          p.client_name,
          p.planned_start,
          p.planned_end,
          tph.total_project_hours,
          tph.total_project_cost,
          p.budget,
          tph.total_project_cost/p.budget*100 AS percent_spent
      FROM total_project_hours AS tph
      left join projects as p
          on p.id = task_project_id
    ")
end

def self.project_with_data(project_id)
  find_by_sql(["WITH cte AS (
    SELECT
        p.id AS project_id,
        t.id AS task_id,
        t.name AS task_name,
        t.price_per_hour,
        t.description,
        t.billable,
        t.project_id AS task_project_id,
        DATE_PART('hour', tb.end_time - tb.start_time) AS hours
    FROM tasks AS t
    INNER JOIN projects AS p
        ON p.id = t.project_id
    LEFT JOIN timeblocks AS tb
        ON t.id = tb.task_id
    INNER JOIN users AS u
        ON u.id = tb.user_id
    WHERE p.id = ?
    ORDER BY t.id
    )
    ,total_task_hours AS (
        SELECT 
            task_id,
            task_name,
            description,
            billable,
            price_per_hour,
            SUM(hours) as total_hours,
            CAST(price_per_hour AS FLOAT) * SUM(hours) AS total_cost,
            task_project_id
        FROM cte
        GROUP BY task_id, task_name, description, billable, price_per_hour, task_project_id
        )
        ,total_project_hours AS (
        SELECT 
            task_project_id,
            SUM(total_hours) as total_project_hours,
            SUM(total_cost) as total_project_cost
        FROM total_task_hours
        GROUP BY task_project_id
        )
    select
        tph.task_project_id as project_id,
        p.name as project_name,
        p.client_name,
        p.planned_start,
        p.planned_end,
        tph.total_project_hours,
        tph.total_project_cost,
        p.budget,
        tph.total_project_cost/p.budget*100 AS percent_spent
    FROM total_project_hours AS tph
    left join projects as p
        on p.id = task_project_id", project_id]).first
end

end