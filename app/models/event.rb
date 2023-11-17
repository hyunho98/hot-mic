class Event < ApplicationRecord
    validates :name, presence: true
    validates :details, presence: true
    validates :type, presence: true

    has_many :reviews
    has_many :users, through: :reviews
end
