class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :content
      t.integer :num_likes
      t.string :thumbnail_url
      t.references :likeable, polymorphic: true
      t.references :user, null: false, foreign_key: true
      t.references :topic, null: false, foreign_key: true

      t.timestamps
    end
  end
end