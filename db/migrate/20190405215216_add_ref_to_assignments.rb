class AddRefToAssignments < ActiveRecord::Migration[5.2]
  def change
    add_reference :assignments, :project, foreign_key: true
  end
end
