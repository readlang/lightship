class ActionSerializer < ActiveModel::Serializer
  attributes :id, :track_id, :date_time, :number, :difficulty, :comment
end
