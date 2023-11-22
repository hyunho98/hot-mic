class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :details, :event_type, :image_url

  has_many :reviews
  has_many :users
end
