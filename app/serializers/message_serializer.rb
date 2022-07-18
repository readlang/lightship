class MessageSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :group_id, :text, :username

  # belongs_to :user

  def username
    object.user.username
  end

end
