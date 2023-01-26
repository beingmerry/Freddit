class ExpandedTopicsSerializer < ActiveModel::Serializer
  attributes :id, :name, :popular_posts

  def popular_posts
    Post.top25(object.posts)
  end
end
