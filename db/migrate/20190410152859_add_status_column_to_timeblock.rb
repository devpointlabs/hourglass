class AddStatusColumnToTimeblock < ActiveRecord::Migration[5.2]
  def change
    add_column :timeblocks, :status, :string
  end
end
