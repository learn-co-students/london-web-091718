class ApplicationController < ActionController::Base
  helper_method :current_user, :logged_in?

  def current_user
    if session[:user_id]
      User.find(session[:user_id])
    else
      User.new
    end
  end

  def logged_in?
    !!current_user.id
  end

  def authorized?
    if !logged_in?
      flash[:authorized] = "You aren't logged in"
      redirect_to login_path and return
    end
  end

  def authorized_for(user_id)
    if current_user.admin == true
      true
    elsif current_user.id != user_id.to_i
      flash[:authorized] = "You can't view a page that doesn't belong to you!"
      redirect_to current_user
    end
  end
end
