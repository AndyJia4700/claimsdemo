class CreatePatients < ActiveRecord::Migration[5.2]
  def change
    create_table :patients do |t|
      t.string :name
      t.date :birthdate
      t.string :insurance_id
      t.integer :user_id
      
      t.timestamps
    end
    add_index :patients, :user_id
  end
end
