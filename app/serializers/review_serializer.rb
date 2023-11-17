class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :content, :likes, :dislikes

  belongs_to :user
  belongs_to :event
end
