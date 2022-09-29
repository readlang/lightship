class Action < ApplicationRecord
    belongs_to :track
    # belongs_to :user, through: :track # this is not a valid association

    validates :number, presence: true

end
