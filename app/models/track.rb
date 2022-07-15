class Track < ApplicationRecord
    belongs_to :user
    belongs_to :group, optional: true
    has_many :actions
end
