class AddUserIdToTimeblock < ActiveRecord::Migration[5.2]
  def change
    add_reference :timeblocks, :user, foreign_key: true
  end
end
