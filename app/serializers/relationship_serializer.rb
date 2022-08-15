class RelationshipSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :friend_id
end
