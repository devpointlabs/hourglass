class AddRefrenceToTasks < ActiveRecord::Migration[5.2]
  def change
    add_reference :timeblocks, :task, foreign_key: true 
  end
end
