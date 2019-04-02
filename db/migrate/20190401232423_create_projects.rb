class CreateProjects < ActiveRecord::Migration[5.2]
  def change
    create_table :projects do |t|
      t.string :name
      t.string :client_name
      t.date :planned_start
      t.date :planned_end
      t.text :notes

      t.timestamps
    end
  end
end
