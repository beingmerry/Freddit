class ExpandedUserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email
  has_many :posts
end
