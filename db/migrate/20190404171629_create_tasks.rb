class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :name
      t.string :description
      t.boolean :billable
      t.belongs_to :project, foreign_key: true
      t.string :price_per_hour

      t.timestamps
    end
  end
end
