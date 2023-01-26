class Api::UsersController < ApplicationController
  wrap_parameters false
  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  def index
    render json: User.all, status: :ok
  end

  def show
    user = User.find(params[:id])
    return render json: user, serializer: ExpandedUserSerializer, status: :ok if user.id == session[:user_id]

    render json: user, serializer: PrivateUserSerializer, status: :ok
  end

  def create
    user = User.create(user_params)
    if user.valid?
      session[:user_id] = user.id
      return render json: user, serializer: ExpandedUserSerializer, status: :created
    end

    errors(user)
  end

  private

  def errors(user)
    render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
  end

  def user_params
    params.permit(%i[username email password password_confirmation])
  end

  def not_found
    render json: { errors: ['User ID invalid'] }, status: :not_found
  end
end
