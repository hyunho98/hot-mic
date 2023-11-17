class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :image_url

  has_many :reviews
end
