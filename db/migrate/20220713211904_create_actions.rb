class CreateActions < ActiveRecord::Migration[6.1]
  def change
    create_table :actions do |t|
      t.integer :track_id
      t.float :number
      t.string :comment

      t.timestamps
    end
  end
end
