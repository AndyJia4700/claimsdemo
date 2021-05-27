class CreateCpts < ActiveRecord::Migration[5.2]
  def change
    create_table :cpts do |t|
      t.integer :cpt_code, null: false
      t.text :cpt_description, null: false
      t.integer :billed_amount

      t.timestamps
    end
  end
end
