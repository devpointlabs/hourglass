class RemoveRefFromAssignments < ActiveRecord::Migration[5.2]
  def change
    remove_reference :assignments, :task, foreign_key: true
  end
end
