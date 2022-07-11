class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :email
      t.string :profile_image
      t.string :city
      t.string :state
      t.string :country

      t.timestamps
    end
  end
end
