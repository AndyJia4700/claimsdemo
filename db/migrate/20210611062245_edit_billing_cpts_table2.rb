class EditBillingCptsTable2 < ActiveRecord::Migration[5.2]
  def change
    add_column :billing_cpts, :icd_id1, :integer
    add_column :billing_cpts, :icd_id2, :integer
    add_column :billing_cpts, :icd_id3, :integer
    add_column :billing_cpts, :icd_id4, :integer
  end
end
