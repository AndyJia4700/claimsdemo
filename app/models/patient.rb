# == Schema Information
#
# Table name: patients
#
#  id           :bigint           not null, primary key
#  name         :string
#  birthdate    :date
#  insurance_id :string
#  user_id      :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#
class Patient < ApplicationRecord
    belongs_to :user,
    foreign_key: :user_id,
    class_name: "User"

    has_many :claims,
    foreign_key: :claim_id,
    class_name: "Claim"

end
