class AddAdminToUser < ActiveRecord::Migration[5.2]
  def change
    add_reference :users, :admin, foreign_key: true
  end
end
