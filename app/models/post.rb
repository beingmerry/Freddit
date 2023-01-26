class Post < ApplicationRecord
  after_initialize :default_values
  validates :title, presence: true
  validates :title, length: { maximum: 50 }
  validates :content, presence: true
  validates :num_likes, numericality: { only_integer: true }

  has_many :likes, as: :likeable
  has_many :users, through: :likes
  has_many :comments, dependent: :destroy
  belongs_to :user, optional: true
  belongs_to :topic, optional: true

  def self.titles(posts)
    posts.map(&:title)
  end

  def self.top25(post_collection)
    post_collection.sort_by(&:num_likes).reverse!.slice(0, 26)
  end

  def voted?(current_user_id)
    current_user_id == id
  end

  private

  def default_values
    self.num_likes ||= 0
  end
end
