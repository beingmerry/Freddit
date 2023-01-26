class LikesController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  def index
    user = User.find(params[:user_id])
    render json: user.likes, session_user_id: user.id, status: :ok
  end

  def create
    user = User.find(params[:user_id])
    return unauthorized unless user.id == session[:user_id]

    likeable = Comment.find(params[:comment_id]) if params[:comment_id]
    likeable = Post.find(params[:post_id]) if params[:post_id]

    like = Like.new(like_params)
    like.user = user
    like.likeable = likeable
    if like.valid?
      like.save
      like.update_likes
      return render json: like, session_user_id: session[:user_id], status: :created
    end

    errors(user, like)
  end

  private

  def like_params
    params.permit([:vote])
  end

  def unauthorized
    render json: { errors: ['You do not have permission to view this page'] }, status: :unauthorized
  end

  def errors(user, like)
    if like.errors.full_messages[0] == 'Likeable You can only like a likable object once!'
      return change_vote(user, like)
    end
    render json: { errors: like.errors.full_messages }, status: :unprocessable_entity
  end

  def change_vote(user, like)
    original_like = user.likes.find_by(likeable_id: like.likeable_id)
    original_like.change_vote(like.vote)
    render json: original_like, session_user_id: session[:user_id], status: :accepted
  end

  def not_found
    render json: { errors: ['No such user found'] }, status: :not_found
  end
end
