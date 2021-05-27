class CreateBillingCpts < ActiveRecord::Migration[5.2]
  def change
    create_table :billing_cpts do |t|
      t.integer :cpt_id
      t.text :denied_reason
      t.boolean :denied, default: false
      t.boolean :approved, default: false
      t.integer :claim_id

      t.timestamps
    end
    add_index :billing_cpts, :claim_id
  end
end
