class GroupSerializer < ActiveModel::Serializer
  attributes :id, :group_name, :description, :owner_id, :owner_name

  def owner_name
    object.owner.username
  end

end
