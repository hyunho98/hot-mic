class Review < ApplicationRecord
    validates :title, presence: true
    validates :content, length: { minimum: 250 }
    validates :likes, numericality: { greater_than_or_equal_to: 0 }

    belongs_to :user
    belongs_to :event
end
