class AddProjectIdToNote < ActiveRecord::Migration[5.2]
  def change
    add_column :notes, :project_id, :integer
    add_foreign_key :notes, :projects
  end
end
