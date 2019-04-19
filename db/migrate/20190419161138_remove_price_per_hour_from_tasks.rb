class RemovePricePerHourFromTasks < ActiveRecord::Migration[5.2]
  def change
    remove_column :tasks, :price_per_hour, :string
  end
end
