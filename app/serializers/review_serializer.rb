class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :content

  belongs_to :user
  belongs_to :event
end
