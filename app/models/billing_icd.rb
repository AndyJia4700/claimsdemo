# == Schema Information
#
# Table name: billing_icds
#
#  id             :bigint           not null, primary key
#  icd_id         :string
#  billing_cpt_id :integer
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
class BillingIcd < ApplicationRecord
    # belongs_to :billing_cpt,
    # foreign_key: :billing_cpt_id,
    # class_name: "BillingCpt"
end
