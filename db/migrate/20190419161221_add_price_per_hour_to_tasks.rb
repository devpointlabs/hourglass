class AddPricePerHourToTasks < ActiveRecord::Migration[5.2]
  def change
    add_column :tasks, :price_per_hour, :float
  end
end
