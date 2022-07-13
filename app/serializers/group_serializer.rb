class GroupSerializer < ActiveModel::Serializer
  attributes :id, :group_name, :description, :owner_id
end
