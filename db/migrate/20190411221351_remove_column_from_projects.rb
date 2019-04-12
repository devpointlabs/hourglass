class RemoveColumnFromProjects < ActiveRecord::Migration[5.2]
  def change
    remove_column :projects, :notes, :text
  end
end
