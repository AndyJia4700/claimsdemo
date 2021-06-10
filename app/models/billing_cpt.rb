# == Schema Information
#
# Table name: billing_cpts
#
#  id            :bigint           not null, primary key
#  cpt_id        :integer
#  denied_reason :text
#  denied        :boolean          default(FALSE)
#  approved      :boolean          default(FALSE)
#  claim_id      :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  modifier1     :string
#  modifier2     :string
#  units         :integer
#
class BillingCpt < ApplicationRecord
    belongs_to :claim,
    foreign_key: :claim_id,
    class_name: "Claim"

    has_many :billing_icds,
    foreign_key: :billing_cpt_id,
    class_name: "BillingIcd"
end
