class EditPatientsTable < ActiveRecord::Migration[5.2]
  def change
    add_column :patients, :claim_list, :integer , array: true, default: []
    add_column :claims, :billing_list, :integer, array: true, default: []
  end
end
