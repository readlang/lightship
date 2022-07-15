class Group < ApplicationRecord
    belongs_to :owner, class_name: "User"
    has_many :tracks
    has_many :memberships
    has_many :messages

    has_many :users, through: :memberships

end
