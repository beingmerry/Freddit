class Like < ApplicationRecord
  belongs_to :likeable, polymorphic: true
  belongs_to :user

  validates :vote, numericality: { in: -1..1 }
  validates :likeable_id, uniqueness: { scope: %i[user_id likeable_type], message: 'You can only like a likable object once!' }

  def update_likes
    unless likeable.nil?
      likeable.num_likes += vote
      likeable.save
    end
  end

  def change_vote(new_vote)
    unless likeable.nil?
      likeable.num_likes -= vote
      likeable.num_likes += new_vote
      likeable.save
      self.vote = new_vote
      save
    end
  end
end
