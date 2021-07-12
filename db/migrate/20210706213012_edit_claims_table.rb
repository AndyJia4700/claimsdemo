class EditClaimsTable < ActiveRecord::Migration[5.2]
  def change
    add_column :claims, :provider_id, :integer
    add_column :claims, :total_amount, :integer
  end
end
