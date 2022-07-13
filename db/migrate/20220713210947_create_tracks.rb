class CreateTracks < ActiveRecord::Migration[6.1]
  def change
    create_table :tracks do |t|
      t.integer :user_id
      t.string :title
      t.string :activity
      t.string :minmax
      t.float :number
      t.string :unit
      t.string :interval
      t.string :notes
      t.integer :group_id

      t.timestamps
    end
  end
end
