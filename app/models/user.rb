class User < ApplicationRecord
    validates :email, :password_digest, :session_token, presence: true
    
end