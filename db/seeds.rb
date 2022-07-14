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

# this is flawed because one user may land up in a group twice (two memberships may be identical)
Membership.destroy_all
ActiveRecord::Base.connection.reset_pk_sequence!('memberships')
for i in 1..10 do
    Membership.create!([
        {user_id: i, group_id: 1 + rand(5) },
        {user_id: i, group_id: 1 + rand(5) }
    ])
end

# this Message seed is flawed, because the seeded message author might not be a member of the group that the message is located in
Message.destroy_all
ActiveRecord::Base.connection.reset_pk_sequence!('messages')
50.times do
    Message.create!([
        {user_id: 1 + rand(10), group_id: 1 + rand(5), text: Faker::Quotes::Shakespeare.hamlet_quote }
    ])
end


print "Seeding Done!  "
