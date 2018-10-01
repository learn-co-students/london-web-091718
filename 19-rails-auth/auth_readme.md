1. Un-comment bcrypt from the `Gemfile`, `bundle install`. Why are we doing it?
2. `rails g resource User username admin:boolean secret`
3. User model has to have these:
```ruby
validates :username, uniqueness: true, presence: true
has_secure_password
```
4. `rails g migration AddPasswordToUsers`

```ruby
class AddPasswordToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :password_digest, :string
  end
end
```

5. Create a user in the Rails console, remember to set the `password`. Observe the created instance - is the `password` field present? Inspect the `password_digest` field. This was an OK way to do it. Let's talk about ways that wouldn't be ok. What are the things that could have gone wrong? What are we saving to the database - is it necessary to go through all that hashing?

6. Seed data:

```ruby
User.create([
  { username: "Daniel", password: "daniel", admin: true, secret: "I sleep in a Pink Panther onesie" },
  { username: "Rishi", password: "rishi", admin: true, secret: "I like pudding more than I care to admit." },
  { username: "John", password: "john", admin: false, secret: "I often eats grapes like a wild, starved racoon" },
  { username: "Josie", password: "josie", admin: false, secret: "I talk to trees" },
  { username: "Becky", password: "becky", admin: false, secret: "I can't swim :(" },
  { username: "Joshua", password: "joshua", admin: false, secret: "I like to chase cows" },
  { username: "Ursula", password: "ursula", admin: false, secret: "I hail taxis and then promptly run away" }
])
```

7. Build the `index`, `new` and `show` pages for the Users. Should every user see it? How can we improve security of our secrets?


```ruby
# show
<%= @user.username %>

<p> My secret is: </p>

<p> <%= @user.secret %></p>

<%= link_to "See all users", users_path %>
```

```ruby
# index
<h1>See all users</h1>

<ul>
  <% @users.each do |user| %>
    <li> <%= link_to user.username, user_path(user.id) %> </li>
  <% end %>
</ul>
```

```ruby
<h1> Sign up </h1>
<%= form_for @user do |f| %>
  <%= f.label :username %>
  <%= f.text_field :username %>
  <%= f.label :password %>
  <%= f.text_field :password %>
  <%= f.label :secret %>
  <%= f.text_field :secret %>
  <%= f.submit %>
<% end %>
```

```ruby
# routes
  resources :users, only: [:index, :show, :new, :create]
```

```ruby
# users_controller.rb
def create
  @user = User.new(user_params)
  if @user.valid?
    @user.save
    redirect_to @user
  else
    redirect_to new_user_path
  end
end

private
def user_params
  params.require(:user).permit(:username, :password, :secret)
end
```

Does the `/users/new` url seem like a natural place to create a user? What kind of action does it resemble? It's a signup! Let's add that route, and make sure to delete `:new` from the User's resources!

```ruby
get "/signup", to: 'users#new', as: 'signup'
```

8. Now let's deal with sessions - logging in, inspecting sessions and logging out. How do we know who is who? How to now control the user access?

Before we dig into that, let's go to some website we all know and log in. Observe what happens!

We know now that cookies are responsible for the state of our login. A cookie is the client representation of the state of the session on the server.

The `session` object is one of two (the other one being `flash`) objects that we have available in Rails which are able to carry on information between requests. It's accessible everywhere and it will be our main vehicle to carry on the information. To prove it's function, let's cross off users from the seen list:

Let's hide books we've already seen.

```ruby
# users_controller.rb
def show
  @user = User.find(params[:id])
  session[:seen_user_ids] ||= []
  session[:seen_user_ids] << @user.id
end

def index
  session[:seen_user_ids] ||= []
  @users = User.all.select do |user|
    !session[:seen_user_ids].include?(user.id)
  end
end
```

Although this is a great feature, let's get rid of it and use sessions in a more rational way.

9. Let's implement the full session functionality

There are three actions we want to take. We're already able to sign up, now it's time to log in and log out.

```ruby
# routes.rb
get "/login",     to: 'sessions#new',     as: 'login'
post "/sessions", to: "sessions#create",  as: 'sessions'
post "/logout",   to: "sessions#destroy", as: 'logout'
```

```ruby
# new.html.erb for Session <- a login page!
<h1>Log in</h1>

<% if flash[:errors] %>
  <% flash[:errors].each do |e| %>
    <p> <%= e %> </p>
  <% end %>
<% end %>

<%= form_tag sessions_path do %>
  <%= label_tag :username %>
  <%= text_field_tag :username %>
  <%= label_tag :password %>
  <%= password_field_tag :password %>
  <%= submit_tag %>
<% end %>
```

```ruby
# sessions_controller.rb
class SessionsController < ApplicationController
  def create
    user = User.find_by(username: params[:username])
    if user && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to user
    else
      flash[:errors] = ["invalid username or password"]
      redirect_to login_path
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to login_path
  end
end
```

Because we're now using the `session` object to put a `:user_id` on it, we can now reap the benefits. The concept of a user being logged in now shines and we can start implementing not only authentication but also authorization. Let's recall the difference!

```ruby
# application_controller.rb
# observe function composition
class ApplicationController < ActionController::Base
  helper_method :current_user, :logged_in?  # methods available to the view

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
      flash[:authorized] = "You aren't logged in!"
      redirect_to login_path
    end
  end

  def authorized_for(user_id)
    authorized?
    if current_user.id != user_id.to_i
      flash[:authorized] = "You can't view a page that doesn't belong to you!"
      redirect_to current_user
    end
  end
end
```

```ruby
# app layout enhancement
<% if flash[:authorized] %>
  <p style="color: red;"><%= flash[:authorized] %></p>
<% end %>

<%= link_to "see all users", users_url %>

<% if logged_in? %>
  <p> You are logged in as <%= current_user.username %> <%= link_to "Log out", logout_path, method: "post" %> </p>
<% else %>
  <p> <%= link_to "Log in", login_path %> </p>
<% end %>
```

A user should be able to edit theirs own secret!

```ruby
# edit.html.erb for User
<h1> Edit your details, <%= @user.username %> </h1>
<%= form_for @user do |f| %>
  <%= f.label :username %>
  <%= f.text_field :username %>
  <%= f.label :password %>
  <%= f.text_field :password %>
  <%= f.label :secret %>
  <%= f.text_field :secret %>
  <%= f.submit %>
<% end %>

```

```ruby
# users_controller.rb
def edit
  authorized_for(params[:id])
  @user = User.find(params[:id])
end

def update
  @user = User.find(params[:id])
  @user.update(user_params)
  redirect_to @user
end
```

If we stubmle upon the `AbstractController::DoubleRenderError`, we need to refactor our functions as follows:

```ruby
def authorized?
  if !logged_in?
    flash[:authorized] = "You aren't logged in!"
    redirect_to login_path
    false
  else
   true
  end
end

def authorized_for(user_id)
  if authorized? && current_user.id != user_id.to_i
    flash[:authorized] = "You can't view a page that doesn't belong to you!"
    redirect_to current_user
  end
end
```

10. Implement Admin all-see functionality

We do not want admin users to be visible on the page if you're not logged in as an admin. Let's edit the `users` index view to reflect that need.

```ruby
# index.html.erb for User
<h1>See all users</h1>

<% if current_user.admin %>
  <ul>
    <% @users.each do |user| %>
      <li> <%= link_to user.username, user_path(user.id) %> </li>
    <% end %>
  </ul>
<% else %>
  <ul>
    <% @users.select { |user| user.admin != true }.each do |user| %>
      <li> <%= link_to user.username, user_path(user.id) %> </li>
    <% end %>
  </ul>
<% end %>
```

Although this is a good intuition, I think it's better if we implement that logic in the controller, not the view. Let's not forget that our focus from now is security, and we're breaking the basic rule of MVC as a paradigm.

```ruby
# users_controller
def index
  if current_user.admin == true
    @users = User.all
  else
    @users = User.all.select{|user| user.admin != true}
  end
end
```

11. Additional information

There is loads more to security than we have mentioned here. Make sure to do your research and never let your pride run wild - correct authorisation is an arms race and there are people who commit their whole lives to it.

[Hackers IRL](https://www.youtube.com/watch?v=qbWqXKN3m3c)
[Have I Been Pwned?](https://haveibeenpwned.com)
[PlainTextOffenders](http://plaintextoffenders.com/)
[Hackertyper](http://hackertyper.com/)
[Follow Randall for security tweets](https://twitter.com/rdegges)
[Gynvael Coldwind's YT channel](https://www.youtube.com/user/GynvaelEN)
[Darknet Diaries](https://darknetdiaries.com/)
[The Undocumented Web](https://syntax.fm/show/060/the-undocumented-web-scraping-private-apis-proxies-and-alternative-solutions)

Although this lecture is supposed to be about auth, it's also about the way we think about all resources in our application. From now on, not everything we do in our app is available to everyone, and this is the attitude I'd like you to take away from today.

And remember: TO AUTH WELL IS TO BE HUMBLE.
