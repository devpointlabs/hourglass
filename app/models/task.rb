class Task < ApplicationRecord
  belongs_to :project
  has_many :assignments
  has_many :users, through: :assignments

  has_many :timeblocks, dependent: :destroy

  def self.find_with_hours
  end

  def self.tasks_with_data(project_id)
    find_by_sql(["
        WITH cte AS (
    SELECT
        p.id AS project_id,
        t.id AS task_id,
        t.name AS task_name,
        t.price_per_hour,
        t.description,
        t.billable,
        (DATE_PART('hour', tb.end_time - tb.start_time)*60 + date_part('minute',tb.end_time - tb.start_time))/ 60 AS hours
    FROM tasks AS t
    LEFT JOIN projects AS p
        ON p.id = t.project_id
    LEFT JOIN timeblocks AS tb
        ON t.id = tb.task_id
    LEFT JOIN users AS u
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
            price_per_hour * SUM(hours) AS total_cost,
            project_id
        FROM cte
        GROUP BY task_id, task_name, description, billable, price_per_hour, project_id
        )
    SELECT tth.*
    FROM total_task_hours AS tth
        ", project_id])
  end

  def self.billable_task_totals(project_id)
    find_by_sql(["
    WITH cte AS (
    SELECT
        tb.task_id,
        t.id,
        t.name,
        tb.start_time,
        tb.end_time,
        t.project_id,
        t.billable,
        t.price_per_hour,
        coalesce((DATE_PART('hour', tb.end_time - tb.start_time)*60 + date_part('minute',tb.end_time - tb.start_time))/ 60, 0) AS hours
    FROM tasks AS t
    LEFT JOIN timeblocks AS tb
    ON tb.task_id = t.id
    WHERE t.project_id = ?
    ),
    total_task_hours AS (
    SELECT
        task_id,
        billable,
        price_per_hour,
        SUM(hours) as total_task_hours,
        price_per_hour * SUM(hours) AS total_task_cost,
        project_id
    FROM cte
    GROUP BY task_id, billable, price_per_hour, project_id
    ),
        total_billable_hours as (
        select
        billable,
    SUM(total_task_hours) as total_billable_hours,
    SUM(total_task_cost) as total_billable_cost
    FROM total_task_hours
    GROUP BY billable
    )
    select
    billable,
    total_billable_hours,
    total_billable_cost
    FROM total_billable_hours       
        ", project_id]).map do |n|
            {billable: n.billable,
        total_billable_hours: sprintf("%.2f", n.total_billable_hours),
        total_billable_cost: ActiveSupport::NumberHelper::number_to_currency(n.total_billable_cost)}
        end
  end
end
