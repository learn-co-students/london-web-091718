# Authentiaction

Today's attitude: Reverse - engineering.

[Have I Been Pwned?](https://haveibeenpwned.com)

We're going to 'hack' our little application, so we can get access to editing secrets. Along the way, we will be working with various auth concepts :

- How does auth work in theory?
- Using `bcrypt` to create passwords in Rails
- Exposing user authentication in the UI
- Sessions and cookies
- Authorization and User-specific content
- Logging out
- Conclusion

[PlainTextOffenders](http://plaintextoffenders.com/)

Let's pretend that you, as a hacker, have gained the access to the developers computer. We are able to edit the code and our goal is to build a comprehensive report on how this app handles auth.

In the real world, a job like that would be called penetration testing. People who do that are often called security researchers or pentesters.

Though it is rare that a pentester would have access to a computer with the source code, this is an assumption we're making for the purpose of today's lecture.

LETS DO IT

[Hackers IRL](https://www.youtube.com/watch?v=qbWqXKN3m3c)

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

7. Inspect the `index`, `new` and `show` pages for the Users. Should every user see it? How can we improve security of our secrets?

8. Inspect the routes

9. Does the `/users/new` url seem like a natural place to create a user? What kind of action does it resemble? It's a signup! Let's add that route, and make sure to delete `:new` from the User's resources!

10. Now let's deal with sessions - logging in, inspecting sessions and logging out. How do we know who is who? How to now control the user access?

Before we dig into that, let's go to some website we all know and log in. Observe what happens!

We know now that cookies are responsible for the state of our login. A cookie is the client representation of the state of the session on the server.

The `session` object is one of two (the other one being `flash`) objects that we have available in Rails which are able to carry on information between requests. It's accessible everywhere and it will be our main vehicle to carry on the information. To prove its function, let's cross off users from the seen list:

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

11. Let's implement the full session functionality

There are three actions we want to take. We're already able to sign up, now it's time to log in and log out.

```ruby
# routes.rb
get "/login",     to: 'sessions#new',     as: 'login'
post "/sessions", to: "sessions#create",  as: 'sessions'
post "/logout",   to: "sessions#destroy", as: 'logout'
```

Because we're now using the `session` object to put a `:user_id` on it, we can now reap the benefits. The concept of a user being logged in now shines and we can start implementing not only authentication but also authorization. Let's recall the difference!


12. Implement Admin all-see functionality

13. Additional information

There is loads more to security than we have mentioned here. Make sure to do your research and never let your pride run wild - correct authorisation is an arms race and there are people who commit their whole lives to it.




[Hackertyper](http://hackertyper.com/)

[Follow Randall for security tweets](https://twitter.com/rdegges)

[Gynvael Coldwind's YT channel](https://www.youtube.com/user/GynvaelEN)

[Darknet Diaries](https://darknetdiaries.com/)

[The Undocumented Web](https://syntax.fm/show/060/the-undocumented-web-scraping-private-apis-proxies-and-alternative-solutions)

Although this lecture is supposed to be about auth, it's also about the way we think about all resources in our application. From now on, not everything we do in our app is available to everyone, and this is the attitude I'd like you to take away from today.

And remember: TO AUTH WELL IS TO BE HUMBLE.


99. extra

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
