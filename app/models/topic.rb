class Topic < ApplicationRecord
  validates :name, presence: true
  has_many :posts

  def post_titles
    Post.titles(posts)
  end
end
