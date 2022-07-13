class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :profile_image, :city, :state, :country
  # :password_digest, 

end
