class Track < ApplicationRecord
    belongs_to :user
    belongs_to :group, optional: true
    has_many :actions

    def actions_sorted
        self.actions.sort_by{|x| x.date_time }
    end

    validates :title, :activity, presence: true, length: { in: 3..30 } 
    validates :number, :unit, presence: true 

end
