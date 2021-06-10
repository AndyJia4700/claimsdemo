class EditBillingCptTable < ActiveRecord::Migration[5.2]
  def change
    add_column :billing_cpts, :modifier1, :string
    add_column :billing_cpts, :modifier2, :string
    add_column :billing_cpts, :units, :integer
  end
end
