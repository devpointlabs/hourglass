class AddManualEntryColumnToTimeblocks < ActiveRecord::Migration[5.2]
  def change
    add_column :timeblocks, :manualEntry, :boolean
  end
end
