class User < ApplicationRecord
    has_secure_password

    has_many :tracks
    has_many :owned_groups, class_name: "Group", foreign_key: :owner_id  # req'd since default "user.groups" goes thru memberships
    has_many :memberships
    has_many :messages
    has_many :goals
    has_many :relationships # returns relationships, not users
    has_many :relationshipees, class_name: "Relationship", foreign_key: :friend_id # returns relationships from the "friend" side
    has_many :friends, class_name: "User", through: :relationships # returns users
    
    has_many :actions, through: :tracks
    has_many :groups, through: :memberships 

    validates :username, presence: true, uniqueness: true, length: { in: 4..12 }

    def self.search(search_term)
        self.all.find{ |user| user.username.downcase.include? (search_term.downcase) }  # note: returns the first match (not an array)
    end
end
