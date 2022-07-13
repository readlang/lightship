# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'

print "Destroying current database records  "
User.destroy_all

print "Resetting PK sequence to start at 1  "
ActiveRecord::Base.connection.reset_pk_sequence!('users')

print "Seeding...  "
default_password = BCrypt::Password.create('1234')

10.times do
    first_name = Faker::Name.first_name
    User.create!([
        { username: (first_name + Faker::Name.last_name), password_digest: default_password, 
        email: first_name + "@gmail.com", city: Faker::Address.city, 
        state: Faker::Address.state, country: "United States" }
    ])    
end

print "Seeding Done!  "

# create_table "users", force: :cascade do |t|
#     t.string "username"
#     t.string "password_digest"
#     t.string "email"
#     t.string "profile_image"
#     t.string "city"
#     t.string "state"
#     t.string "country"
#     t.datetime "created_at", precision: 6, null: false
#     t.datetime "updated_at", precision: 6, null: false
# end