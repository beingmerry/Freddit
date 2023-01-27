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
      user.save
      self.vote = new_vote
      save
    end
  end

  def remove_vote
    unless likeable.nil?
      likeable.num_likes -= vote
      likeable.save
      user.save
      self.vote = 0
      save
    end
  end
end
