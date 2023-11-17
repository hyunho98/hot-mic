class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :content, :likes, :dislikes
end
