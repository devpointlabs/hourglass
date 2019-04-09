class Assignment < ApplicationRecord
  belongs_to :user
  belongs_to :project

  def self.find_by_u_and_p(user, project)
    Assignment.find_by_sql(
      "SELECT *
      FROM assignments AS a
      WHERE a.user_id = #{user.id} AND a.project_id = #{project.id}"
    ).first
  end
end
