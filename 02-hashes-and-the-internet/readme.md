# Hashes and the internet

## Things we will mention today:

- GET requests
- server responses
- APIs (on the web and others)
- JSON (string formatted as a hash/object)
- Ruby Gems

## Types of data sent

- reddit.com (what does it return?)
- reddit.com/.json  (what does this return?)

Chome extension name - json viewer

## Wouldn't it be great if we could do these things programmatically? Like this:

```ruby
response = make_request('www.reddit.com/.json')

reddit_hash = parse_into_hash(response)
```

## We will use following gems to make requests and *parse* the responses:

```ruby
gem install rest-client
gem install pry
-----------------------
require 'pry'
require 'rest-client'
require 'json'
```

## Google books API

docs: https://developers.google.com/books/docs/v1/using
url for querying: https://www.googleapis.com/books/v1/volumes?q=#{QUERY}

## What we want to achieve today:

```
# Deliverables
# 1. Write an application that takes a search term from a user
# 2. Make a Request to the GoogleBooks API and get back some results
# 3. Display the titles, author names, and description for each book
```

## Useful functions

`response = RestClient.get(url)`
`JSON.parse(response.body)`
`gets.chomp`

## nil handling

```ruby
def get_author(book)
  if  book["volumeInfo"]["authors"]
   book["volumeInfo"]["authors"].join(" and ")
  else
   "No authors found"
  end
end
```

## What can we encapsulate further?

## REST apis to use for practice & your projects:

- https://jsonplaceholder.typicode.com/
- https://github.com/Kikobeats/awesome-api
- https://github.com/abhishekbanthia/Public-APIs
