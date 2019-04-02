class CreateTimeblocks < ActiveRecord::Migration[5.2]
  def change
    create_table :timeblocks do |t|
      t.datetime :start_time
      t.datetime :end_time
      t.integer :billable
      t.integer :unbillable
      t.belongs_to :project, foreign_key: true

      t.timestamps
    end
  end
end
