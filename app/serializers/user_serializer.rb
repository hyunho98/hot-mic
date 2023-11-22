class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :image_url

  has_many :reviews
  has_many :events
end
