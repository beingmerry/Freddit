class SessionsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :unauthorized
  def show
    user = User.find(session[:user_id])
    render json: user, serializer: ExpandedUserSerializer, status: :ok
  end

  def create
    user = User.find_by(username: params[:username])

    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      return render json: user, status: :ok
    end
    incorrect_username_or_password
  end

  def destroy
    session.delete :user_id
    head :no_content
  end

  private

  def unauthorized
    render json: { errors: ['No user currently logged in'] }, status: :unauthorized
  end

  def not_found
    render json: { errors: ['User not found'] }, status: :not_found
  end

  def incorrect_username_or_password
    render json: { errors: ['Incorrect username or password'] }, status: :unauthorized
  end
end
