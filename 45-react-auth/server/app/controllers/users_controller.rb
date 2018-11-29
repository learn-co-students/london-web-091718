class UsersController < ApplicationController
  def index
    @users = User.all
    render json: @users
  end

  def signin
    @user = User.find_by(username: params[:username])
    if @user && @user.authenticate(params[:password])
      render json: {username: @user.username, token: issue_token({id: @user.id})}
    else
      render json: {error: 'Username/password invalid.'}, status: 401
    end
  end
  
  def validate
    @user = get_current_user
    if @user
      render json: {username: @user.username, token: issue_token({id: @user.id})}
    else
      render json: {error: 'Username/password invalid.'}, status: 401
    end
  end

  def get_inventory
    @user = get_current_user
    if @user
      render json: @user.items
    else
      render json: {error: 'Not a valid user.'}, status: 401
    end
  end
end
