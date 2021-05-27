# == Schema Information
#
# Table name: claims
#
#  id                    :bigint           not null, primary key
#  claim_number          :string           not null
#  claim_date_of_service :date
#  message               :text
#  patient_id            :integer          not null
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#
class Claim < ApplicationRecord
    belongs_to :patient,
    foreign_key: :patient_id,
    class_name: "Patient"

    has_many :billing_cpts,
    foreign_key: :claim_id,
    class_name: "BillingCpt"
end
