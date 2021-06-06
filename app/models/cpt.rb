# == Schema Information
#
# Table name: cpts
#
#  id              :bigint           not null, primary key
#  cpt_code        :integer          not null
#  cpt_description :text             not null
#  billed_amount   :integer
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class Cpt < ApplicationRecord
    validates :cpt_code, :cpt_description, :billed_amount, presence: true
    validates :cpt_code, uniqueness: true
end
