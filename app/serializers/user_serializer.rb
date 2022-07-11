class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :email, :profile_image, :city, :state
end
