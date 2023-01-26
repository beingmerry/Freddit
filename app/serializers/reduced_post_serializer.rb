class ReducedPostSerializer < ActiveModel::Serializer
  attributes :id, :title, :topic_name

  def topic_name
    return nil if object.topic.nil?
    
    object.topic.name
  end
end
