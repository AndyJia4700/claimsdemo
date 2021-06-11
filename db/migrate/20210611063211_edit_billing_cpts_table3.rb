class EditBillingCptsTable3 < ActiveRecord::Migration[5.2]
  def change
    add_column :billing_cpts, :date_of_service, :date
    add_column :billing_cpts, :amount, :integer
  end
end
