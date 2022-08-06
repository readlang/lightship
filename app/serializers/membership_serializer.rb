class MembershipSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :group_id # :user_name

  belongs_to :user
  
  # def user_name
  #   object.user.username
  # end

end
