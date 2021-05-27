class CreateClaims < ActiveRecord::Migration[5.2]
  def change
    create_table :claims do |t|
      t.string :claim_number, null: false
      t.date :claim_date_of_service
      t.text :message
      t.integer :patient_id, null: false

      t.timestamps
    end
    add_index :claims, :patient_id
  end
end
