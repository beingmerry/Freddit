class LikeSerializer < ActiveModel::Serializer
  attributes :id, :post_or_comment

  def post_or_comment
    if object.likeable_type == 'Comment'
      comment = Comment.find(object.likeable_id)
      options = { serializer: CommentSerializer, session_user_id: instance_options[:session_user_id] }
      return ActiveModelSerializers::SerializableResource.new(comment, options)
    end
    post = Post.find(object.likeable_id)
    options = { serializer: PostSerializer, session_user_id: instance_options[:session_user_id] }
    ActiveModelSerializers::SerializableResource.new(post, options)
  end
end
