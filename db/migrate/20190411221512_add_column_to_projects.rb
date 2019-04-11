class AddColumnToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :budget, :float
  end
end
