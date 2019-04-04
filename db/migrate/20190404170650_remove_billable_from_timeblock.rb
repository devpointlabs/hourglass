class RemoveBillableFromTimeblock < ActiveRecord::Migration[5.2]
  def change
    remove_column :timeblocks, :billable, :integer
    remove_column :timeblocks, :unbillable, :integer
  end
end
