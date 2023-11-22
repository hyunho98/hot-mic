class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :title, :content, :user_id, :event_id

  belongs_to :user
  belongs_to :event
end
