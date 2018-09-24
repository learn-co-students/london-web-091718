require 'pry'

class User

  attr_accessor :username
  @@all = []

  def initialize(username)
    @username = username
    @@all << self
  end

  def own_tweets
    Tweet.all.select do |tweet|
      tweet.user == self
    end
  end

  def likes
    Like.all.select do |like|
      like.user == self
    end
  end

  def self.all
    @@all
  end

  def securely_post_tweet(message)
    post_tweet(message)
  end

  def like_tweet(tweet)
    Like.new(self, tweet)
  end

  private

  def post_tweet(message)
    Tweet.new(message, self)
  end
end

class Tweet
  attr_accessor :message, :user

  @@all = []

  def initialize(message, user)
    @message = message
    @user = user
    @@all << self
  end

  def likes
    Like.all.select do |like|
      like.tweet == self
    end
  end

  def likers
    likes.map {|like| like.user}
  end

  def self.all
    @@all
  end

  def self.delete_tweet(tweet)
    @@all.delete(tweet)
  end

  def self.find_tweet(message)
    @@all.find {|t| t.message == message}
  end
end

class Like

  attr_accessor :user, :tweet

  @@all = []

  def initialize(user, tweet)
    @user = user
    @tweet = tweet
    @@all << self
  end

  def self.all
    @@all
  end

end

dan = User.new('Dan')
ed  = User.new('Ed')
oliver = User.new('Oliver')

dan.securely_post_tweet('Hey, I\'m on twitter!')
ed.securely_post_tweet('HI')
oliver.securely_post_tweet('Hello mod1!')
ed.securely_post_tweet('I AM ON TWITTER')
dan.securely_post_tweet('F2F!')
dan.securely_post_tweet('i\'s a rainy day in ldn')


tweets = Tweet.all

like_1 = dan.like_tweet(tweets[0])
like_2 = dan.like_tweet(tweets[1])
like_3 = dan.like_tweet(tweets[2])
like_4 = dan.like_tweet(tweets[3])
like_5 = ed.like_tweet(tweets[1])
like_6 = ed.like_tweet(tweets[3])

tweet_no_3 = Tweet.all[3]

all_tweets= Tweet.all
all_users = User.all

binding.pry
p 'eof'
