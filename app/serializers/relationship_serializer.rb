class RelationshipSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :friend_id, :friend_username, :friend_profile_image # :friend

  def friend_username
    object.friend.username
  end

  def friend_profile_image
    object.friend.profile_image
  end

end
