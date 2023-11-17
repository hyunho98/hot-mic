class UsersController < ApplicationController
    has_secure_password
    
    validates :username, presence: true, uniqueness: true

    has_many :reviews
    has_many :events, through: :reviews
end
