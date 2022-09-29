class Goal < ApplicationRecord
    belongs_to :user

    validates :title, presence: true, length: { in: 3..35 }
    
end
