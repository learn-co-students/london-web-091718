require 'pry'
require 'rest-client'
require 'json'

def get_user_input
  puts 'Please provide a search term:'
  gets.chomp
end

def request_books(user_input)
  url = "https://www.googleapis.com/books/v1/volumes?q=#{user_input}"
  response = RestClient.get(url)
  parsed_hash = JSON.parse(response)
end

def get_books(response)
  # returns an array of book hashes
  response["items"]
end

def print_authors(book)
  authors = book['volumeInfo']['authors']
  if !!authors
    puts authors.join(' & ')
  else
    puts 'No authors listed'
  end
end

def print_title(book)
  title = book['volumeInfo']['title']
  if !!title
    puts title
  else
    puts 'No title listed'
  end
end

def print_books(books_array)
  books_array.each do |book|
    puts '-------------'
    print_title(book)
    puts 'by:'
    print_authors(book)
  end
end

def run
  user_input = get_user_input
  response = request_books(user_input)
  books_array = get_books(response)
  print_books(books_array)
end

run
p 'eof'
