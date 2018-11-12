# Rails API

### New in Rails 5 the --api Flag

- We're modern web developers and we want to create reactive single page applications. Let's make a new rails API
  without any of the bulk of the ActionView library
- Let's create a new rails project that is _just_ a json api

`rails new YOUR_APP_NAME --api`

### After creating the rails API only walk through the differences:

- Look at `app/views`
- Look at `app/controllers/application_controller.rb` we see this:

```ruby
class ApplicationController < ActionController::API
end
```

- We see this much leaner API that doesn't include the ActionView bulk
- Generate a model, migrate, check our schema, then test this model in the console.
- Create a controller: `rails g controller api/v1/users`. Explain the benefits of versioning our api:


  - This is the first version of our API. Therefore, the controller should go inside `api/v1`. If anyone is relying on our API and we update the code in a way that would break other people's projects, it's good practice to make that update its own version of the API. You can refer to [this article for more details](https://chriskottom.com/blog/2017/04/versioning-a-rails-api/).


- Create our api then show the data we see, which will be some JSON obj

- What if we need to specify the shape of our data? What if there is some kind of association we want to represent here?

- What if we don't want to expose all the information on the table; there are attributes we want to include and others
  we want to _exclude_

#### Enter the Serializer

- Serialization allows us to control and specify the shape of the data--in this case json-- that we receive from our
  backend - If a user `has_many :tweets`, it would be great to see that relationship reflected in my json:

```json
{
  "id": 1,
  "name": "coffee_dad",
  "tweets": [
    {
      "id": 1,
      "content": "good # coffee",
      "user_name": "coffee_dad"
    },
    {
      "id": 2,
      "content": "having # coffee",
      "user_name": "coffee_dad"
    },
    {
      "id": 3,
      "content": "they will pay for what they've done",
      "user_name": "coffee_dad"
    }
  ]
}
```

- Add the [active model serializer gem to your gemfile:][active-model-serializer-docs]
  `gem 'active_model_serializers', '~> 0.10.0'`

- `rails g serializer User`

```Ruby
attributes :id, :name, :beef
# allows us to create custom methods for our serializer
# we likely won't need these custom methods but IN CASE WE DO, this is possible
def beef
	"steak"
end
```

- Under the hood, our serializer is doing this:

```ruby
# UsersController
def index
	@users = User.all
	# implicitly calling UserSerializer
	# render json: UserSerializer.new(@pokemon)
	render json: @users
end
```

- Navigate to `localhost:3000/api/v1/users` and we should see our users rendered as JSON

> Make sure you've added the correct routes to your app:

```ruby
# config/routes.rb
Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index]
    end
  end
end

```

## Connecting to the Frontend

- The last step is making a fetch request from the browser. **Make sure you open a new tab and navigate to some other domain (we want the CORS error)**

```JavaScript
fetch('http://localhost:3000/api/v1/users')
.then(r => r.json())
.then(userData => console.log(userData))
```
- Uh oh:
  - Failed to load http://localhost:3000/api/v1/users: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'null' is therefore not allowed access. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.



- [CORS][mdn-cors] is another security feature. I'd highly recommend that students read the CORS article on MDN.
- rails has a lot of security features out of the box; things like the authenticity token, for example
- Two separate websites, or ORIGINS should not be able to communicate with each other by default
- CORS is simply a browser _law_ that stops two sites of different origins from communicating
- We need to tell our backend to allow CORS
- Add cors to our project; allow requests from everywhere for now; production we can imagine our code running on some
  other origin:

  - Uncomment the `rack-cors` gem from your gemfile. `bundle install`
  - Open `app/config/initializers/cors.rb` and change the settings to the following:

```ruby
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end
```

- It's worth mentioning that we should change these settings before deployment. Allowing all kinds of requests from any origin leaves our app wide open.

- Lastly reiterate the request/response cycle: the client sends a request (via a `fetch` request) that the server responds to with some data, in this case our users JSON.

---

[rails-api-docs]: http://guides.rubyonrails.org/api_app.html
[sample-vid-1-part-1]: https://www.youtube.com/watch?v=7T89p_5B4bc
[sample-vid-1-part-2]: https://www.youtube.com/watch?v=Zj-SkQGicFk
[sample-vid-2-part-1]: https://www.youtube.com/watch?v=yuXtumsPuKA
[sample-vid-2-part-2]: https://www.youtube.com/watch?v=uWO8JtApqtE
[starter-code-backend]: https://github.com/learn-co-curriculum/web-091817-zoo-keepr-backend
[starter-code-frontend]: https://github.com/learn-co-curriculum/zoo-keepr-frontend/tree/web-091817/src
[mind-blown-gif]: https://media.giphy.com/media/xT0xeJpnrWC4XWblEk/giphy.gif
[active-model-serializer-docs]: https://github.com/rails-api/active_model_serializers
[mdn-cors]: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS