class CommentSerializer < ActiveModel::Serializer
  attributes :id, :content, :voted?, :num_likes, :created_at, :post_id
  belongs_to :user

  def voted?
    user = User.find_by(id: instance_options[:session_user_id])
    return 0 if user.nil?

    user.likes.each do |like|
      return like.vote if like.likeable_id == object.id && like.likeable_type == 'Comment'
    end

    0
  end
end
