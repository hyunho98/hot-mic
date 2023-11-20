class Event < ApplicationRecord
    validates :name, presence: true
    validates :details, presence: true, length: { minimum: 50 }
    validates :event_type, presence: true

    has_many :reviews
    has_many :users, through: :reviews
end
