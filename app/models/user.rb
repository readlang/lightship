class User < ApplicationRecord
    has_secure_password

    has_many :tracks
    has_many :owned_groups, class_name: "Group", foreign_key: :owner_id  ### this should work by 4.3.2.3
    has_many :memberships
    has_many :messages
    has_many :goals
    has_many :relationships
    has_many :relationshipees, class_name: "Relationship", foreign_key: :friend_id #works. 
    has_many :friends, class_name: "User", through: :relationships #works. returns users
    
    
    
    has_many :actions, through: :tracks
    has_many :groups, through: :memberships 
end

# notes:
# "source" source: :groups is for a has_many - through relationship
# has_many :owned_groups, foreign_key: :owner_id, source: :groups #### not sure if this works... source is for has_many through