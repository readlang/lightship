# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

print "Destroys current database records & resets PK sequence to start at 1 "
print "Seeding...  "

default_password = BCrypt::Password.create('1234')

User.destroy_all
ActiveRecord::Base.connection.reset_pk_sequence!('users')
10.times do
    first_name = Faker::Name.first_name
    User.create!([
        { username: (first_name + Faker::Name.last_name), password_digest: default_password, 
        email: first_name + "@gmail.com", city: Faker::Address.city, 
        state: Faker::Address.state, country: "United States" }
    ])    
end

Group.destroy_all
ActiveRecord::Base.connection.reset_pk_sequence!('groups')
Group.create!([
    { group_name: "Get in Shape!", description: "Friends support friends in exercise", owner_id: 1 },
    { group_name: "Sleep", description: "Share sleep tips and accountability", owner_id: 2 },
    { group_name: "Stop smoking", description: "Help stop smoking", owner_id: 3 },
    { group_name: "Alcohol reduction", description: "drink less for healthier living and better sleep", owner_id: 4 },
    { group_name: "Meditate for Mindfulness", description: "be more present in life", owner_id: 5 }
])

# puts each user in a membership with two different groups (1 - 5)
Membership.destroy_all
ActiveRecord::Base.connection.reset_pk_sequence!('memberships')
Message.destroy_all
ActiveRecord::Base.connection.reset_pk_sequence!('messages')
Track.destroy_all
ActiveRecord::Base.connection.reset_pk_sequence!('tracks')
Action.destroy_all
ActiveRecord::Base.connection.reset_pk_sequence!('actions')

for id in 1..10 do
    random_number = 1 + rand(3) # creates random number 1-3
    Membership.create!([
        {user_id: id, group_id: random_number },
        {user_id: id, group_id: random_number + 2 }
    ])

    Track.create!([
        {user_id: id, title: "Exercise", activity: "Run", minmax: "at least", number: 1, unit: "mile", interval: "per day", notes: "i am pumped", group_id: (random_number + (2 * rand(2))) },
        {user_id: id, title: "Rest", activity: "Sleep", minmax: "at least", number: 8, unit: "hours", interval: "per day", notes: "this will improve my life", group_id: (random_number + (2 * rand(2))) },
    ])

    Action.create!([
        {track_id: (2 * id - 1), number: (rand(3) + 1), comment: "I so tired!" },
        {track_id: (2 * id - 0), number: (rand(3) + 7), comment: "I'm so well rested" }
    ])

    5.times do
        Message.create!([
            {user_id: id, group_id: (random_number + (2 * rand(2))), text: Faker::Quotes::Shakespeare.hamlet_quote }
        ])
    end

end


print "Seeding Done!  "
