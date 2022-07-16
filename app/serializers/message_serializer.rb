class MessageSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :group_id, :text, :user

  # belongs_to :user

  def user
    object.user.username
  end

end
