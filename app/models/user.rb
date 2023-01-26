class User < ApplicationRecord
  validates :username, presence: true
  validates :username, uniqueness: true
  validates :email, presence: true
  validates :email, uniqueness: true

  has_secure_password

  before_save :downcase_email

  has_many :posts, dependent: :destroy
  has_many :comments, dependent: :destroy
  belongs_to :likeable, polymorphic: true, optional: true

  has_many :likes

  def post_titles
    Post.titles(posts)
  end

  private

  def downcase_email
    self.email = email.downcase
  end
end
