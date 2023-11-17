class ReviewsController < ApplicationController
    validates :content, length: { maximum: 500 }
    validates :likes, numericality: { greater_than_or_equal_to: 0 }
    validates :dislikes, numericality: { greater_than_or_equal_to: 0 }

    belongs_to :user
    belongs_to :event
end
