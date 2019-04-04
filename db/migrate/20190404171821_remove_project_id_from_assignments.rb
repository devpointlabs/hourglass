class RemoveProjectIdFromAssignments < ActiveRecord::Migration[5.2]
  def change
     add_reference :assignments, :task, foreign_key: true
     remove_reference :assignments, :project, foreign_key: true
  end
end
