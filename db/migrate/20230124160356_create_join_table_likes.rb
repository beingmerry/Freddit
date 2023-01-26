class CreateJoinTableLikes < ActiveRecord::Migration[7.0]
  def change
    create_table :likes do |t|
      t.belongs_to :user
      t.references :likeable, polymorphic: true, index: true
      t.integer :vote
      t.timestamps
    end
  end
end
