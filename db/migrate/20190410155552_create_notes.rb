class CreateNotes < ActiveRecord::Migration[5.2]
  def change
    create_table :notes do |t|
      t.string :author
      t.text :body
      t.string :datetime

      t.timestamps
    end
  end
end
