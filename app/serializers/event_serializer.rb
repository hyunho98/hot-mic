class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :details, :type

  has_many :reviews
end
