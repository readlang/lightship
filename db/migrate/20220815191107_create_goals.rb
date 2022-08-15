class CreateGoals < ActiveRecord::Migration[6.1]
  def change
    create_table :goals do |t|
      t.integer :user_id
      t.string :title
      t.string :description
      t.string :why

      t.timestamps
    end
  end
end
