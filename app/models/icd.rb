# == Schema Information
#
# Table name: icds
#
#  id              :bigint           not null, primary key
#  icd_code        :string           not null
#  icd_description :text             not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
class Icd < ApplicationRecord
    
end
