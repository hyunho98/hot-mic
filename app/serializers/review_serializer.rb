class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :likes

  belongs_to :user
  belongs_to :event
end
