class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :details, :type
end
