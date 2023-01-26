class ExpandedPostsSerializer < ActiveModel::Serializer
  attributes :id, :content, :thumbnail_url, :title, :num_likes, :voted?, :sorted_comments, :updated_at, :created_at
  belongs_to :user
  belongs_to :topic

  def sorted_comments
    sorted = Comment.order_by_popularity(object.comments)
    options = { serializer: CommentSerializer, session_user_id: instance_options[:session_user_id] }
    sorted.map { |record| ActiveModelSerializers::SerializableResource.new(record, options) }
  end

  def voted?
    user = User.find_by(id: instance_options[:session_user_id])
    return 0 if user.nil?

    user.likes.each do |like|
      return like.vote if like.likeable_id == object.id
    end

    0
  end

  private

  def user_info(user)
    return nil if user.nil?

    { id: user.id, username: user.username }
  end
end
