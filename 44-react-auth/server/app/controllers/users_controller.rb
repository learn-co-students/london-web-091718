class UsersController < ApplicationController
  def index
    @users = User.all
    render json: @users
  end

  def signin
    @user = User.find_by(username: params[:username])
    if @user && @user.authenticate(params[:password])
      render json: {username: @user.username, id: @user.id}
    else
      render json: {error: 'Username/password invalid.'}, status: 401
    end
  end

  def validate
    @user = User.find_by(username: request.headers['Authorization'])
    if @user
      render json: {username: @user.username, id: @user.id}
    else
      render json: {error: 'Username/password invalid.'}, status: 401
    end
  end
end
