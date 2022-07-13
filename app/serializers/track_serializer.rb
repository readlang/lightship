class TrackSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :title, :activity, :minmax, :number, :unit, :interval, :notes, :group_id
end
