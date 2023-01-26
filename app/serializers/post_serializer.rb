class PostSerializer < ActiveModel::Serializer
  attributes :id, :thumbnail_url, :title, :num_likes, :voted?, :created_at
  belongs_to :topic, serializer: ReducedTopicSerializer
  belongs_to :user

  def voted?
    user = User.find_by(id: instance_options[:session_user_id])
    return 0 if user.nil?

    user.likes.each do |like|
      return like.vote if like.likeable_id == object.id && like.likeable_type == 'Post'
    end

    0
  end
end
