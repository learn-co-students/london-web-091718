class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.valid?
      @user.save
      redirect_to @user
    else
      redirect_to new_user_path
    end
  end

  def show
    @user = User.find(params[:id])
  end

  def index
    if current_user.admin == true
      @users = User.all
    else
      @users = User.all.select{|user| user.admin != true}
    end
  end

  def edit
    authorized_for(params[:id])
    @user = User.find(params[:id])
  end

  def update
    @user = User.find(params[:id])
    @user.update(user_params)
    redirect_to @user
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :secret)
  end
end
