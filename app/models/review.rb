class Review < ApplicationRecord
    validates :title, presence: true
    validates :content, length: { minimum: 250 }

    belongs_to :user
    belongs_to :event
end
