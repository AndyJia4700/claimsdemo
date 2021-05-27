class CreateIcds < ActiveRecord::Migration[5.2]
  def change
    create_table :icds do |t|
      t.string :icd_code, null: false
      t.text :icd_description, null: false

      t.timestamps
    end
  end
end
