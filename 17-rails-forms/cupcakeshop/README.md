# auth

- app controller

```rb
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
    else current_user.id != user_id.to_i
      flash[:authorized] = "You can't view a page that doesn't belong to you!"
      redirect_to current_user
    end
  end
end
```


layout application

```html
<% if flash[:authorized] %>
  <p style="color: red;"><%= flash[:authorized] %></p>
<% end %>

<div>
  <% if logged_in? %>
    <%= session["session_id"] %>
    <p> You are logged in as <%= link_to current_user.username, current_user %> </p>
    <p> <%= link_to "Log out", logout_path, method: "post" %> </p>

    <% if current_user.admin == true %>
      <p> You are an admin </p>
    <% else %>
      <p> You are a user </p>
    <% end %>

  <% else %>
    <p> You are not logged in. </p>
    <p> <%= link_to "Log in?", login_path %> </p>
    <p> or </p>
    <p> <%= link_to "Sign up?", signup_path %> </p>
  <% end %>
</div>
```

users cont
```ruby
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
```
