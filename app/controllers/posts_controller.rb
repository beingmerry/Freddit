class PostsController < ApplicationController
  wrap_parameters false
  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  before_action :get_user
  def index
    posts = @user.nil? ? Post.all : @user.posts
    topic = Topic.find_by(name: params[:topic_name])
    return render json: posts, session_user_id: session[:user_id], status: :ok if topic.nil?

    posts = topic.posts
    render json: posts, session_user_id: session[:user_id], status: :ok
  end

  def show
    post = Post.find(params[:id])
    render json: post, session_user_id: session[:user_id], serializer: ExpandedPostsSerializer, status: :ok
  end

  def create
    if @user&.id == session[:user_id]
      post = Post.create(post_params)
      return errors(post) unless post.valid?

      topic = Topic.find_or_create_by(name: params[:topic_name])
      post.topic = topic
      post.user = @user
      post.save
      return render json: post, status: :created
    end
    unauthorized
  end

  def update
    if @user&.id == session[:user_id]
      post = Post.find(params[:id])
      post.update(post_params)
      return errors(post) unless post.valid?

      return render json: post, serializer: ExpandedPostsSerializer, status: :accepted
    end
    unauthorized
  end

  def destroy
    Post.find(params[:id]).destroy if user&.id == session[:user_id]

    unauthorized
  end

  private

  def get_user
    @user = User.find_by(id: params[:user_id])
    user_not_found if params[:user_id] && @user.nil?
  end

  def errors(post)
    render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
  end

  def unauthorized
    render json: { errors: ['Not authorized'] }, status: :unauthorized
  end

  def post_params
    params.permit(%i[title thumbnail_url content topic_id user_id id])
  end

  def not_found
    render json: { errors: ['Post not found'] }, status: :not_found
  end

  def user_not_found
    render json: { errors: ['User not found'] }, status: :not_found
  end
end
