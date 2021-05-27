class CreateBillingIcds < ActiveRecord::Migration[5.2]
  def change
    create_table :billing_icds do |t|
      t.string :icd_id
      t.integer :billing_cpt_id

      t.timestamps
    end
    add_index :billing_icds, :billing_cpt_id
  end
end
