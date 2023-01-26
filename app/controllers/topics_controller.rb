class TopicsController < ApplicationController
  wrap_parameters false
  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  def index
    topics = Topic.all
    render json: topics, status: :ok
  end

  def show
    topic = Topic.find(params[:id])
    render json: topic, serializer: ExpandedTopicsSerializer, status: :ok
  end

  private

  def not_found
    render json: {errors: ['Topic not found'] }, status: :not_found
  end
end
