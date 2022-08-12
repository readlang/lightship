class MessageSerializer < ActiveModel::Serializer
  # this is new:
  # cache key: 'message', expires_in: 2.hours

  attributes :id, :user_id, :group_id, :text, :username

  # belongs_to :user

  def username
    object.user.username
  end

end
