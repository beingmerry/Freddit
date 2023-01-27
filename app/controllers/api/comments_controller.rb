class Api::CommentsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  wrap_parameters false
  before_action :too_many_arguments, only: [:index]
  before_action :get_user
  before_action :get_post, only: [:index, :create]
  def index
    comments = @user.comments unless @user.nil?
    comments = @post.comments unless @post.nil?
    comments = Comment.all if @user.nil? && @post.nil?

    comments = Comment.order_by_popularity(comments)
    render json: comments, status: :ok
  end

  def create
    return unauthorized unless session[:user_id] == @user.id

    comment = Comment.create(comment_params)
    comment.post = @post
    comment.user = @user
    comment.save
    render json: comment, status: :created
  end

  def update
    return unauthorized unless session[:user_id] == @user.id

    comment = Comment.find(params[:id])
    comment.update(comment_params)

    render json: comment, status: :ok
  end

  def destroy
    return unauthorized unless session[:user_id] == @user.id

    comment = Comment.find(params[:id])
    comment.destroy

    head :no_content
  end

  private

  def get_post
    @post = Post.find_by(id: params[:post_id])
    post_not_found if params[:post_id] && @post.nil?
  end

  def get_user
    @user = User.find_by(id: params[:user_id])
    user_not_found if params[:user_id] && @user.nil?
  end

  def post_not_found
    render json: { errors: ['Post not found'] }, status: :not_found
  end

  def user_not_found
    render json: { errors: ['User not found'] }, status: :not_found
  end

  def not_found
    return json: { errors: ['Comment not found'] }, status: :not_found
  end

  def too_many_arguments
    return render json: { errors: ['Too many arguments'] }, status: :unprocessable_entity if params[:user_id] && params[:post_id]
  end

  def comment_params
    params.permit(%i[id content post_id user_id])
  end

  def unauthorized
    render json: { errors: ['You must be logged in to comment.'] }, status: :unauthorized
  end
end
