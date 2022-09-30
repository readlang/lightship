class Group < ApplicationRecord
    belongs_to :owner, class_name: "User"
    has_many :tracks
    has_many :memberships
    has_many :messages

    has_many :users, through: :memberships
    has_many :actions, through: :tracks

    def actions_sorted
        self.actions.sort_by{|x| x.date_time }
    end

    validates :group_name, :description, presence: true, length: { in: 3..35 }

end
