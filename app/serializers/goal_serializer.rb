class GoalSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :title, :description, :why
end
