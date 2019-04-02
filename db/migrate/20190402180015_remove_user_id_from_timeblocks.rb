class RemoveUserIdFromTimeblocks < ActiveRecord::Migration[5.2]
  def change
    remove_column :timeblocks, :user_id, :integer
  end
end
