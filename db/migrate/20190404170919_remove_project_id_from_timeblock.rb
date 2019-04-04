class RemoveProjectIdFromTimeblock < ActiveRecord::Migration[5.2]
  def change
    remove_reference :timeblocks, :project, foreign_key: true
  end
end
