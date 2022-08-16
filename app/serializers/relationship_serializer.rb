class RelationshipSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :friend_id, :friend_username # :friend

  def friend_username
    object.friend.username
  end

end
