require_relative "../program.rb"

describe "is_palindrome?" do

  it 'should return true if the string is a palindrome' do
    expect(is_palindrome?('kayak')).to be(true)
  end

  it 'should return false if the string is not a palindrome' do
    expect(is_palindrome?('kayaks')).to be(false)
  end

  it 'should return true if the input has spaces and is a palindrome' do
    expect(is_palindrome?('no x in nixon')).to be(true)
  end

  it 'should return true if the input has spaces and is not a palindrome' do
    expect(is_palindrome?('nose x in nixons')).to be(false)
  end

  it 'should return true if the word is a palindrome and ingore caps' do
    expect(is_palindrome?('Kayak')).to be(true)
  end

  it 'should return false if the word is a palindrome and ingore caps' do
    expect(is_palindrome?('Hello')).to be(false)
  end

  it 'should return true if the input has punctuation and it is a palindrome' do
    expect(is_palindrome?('A man, a plan, a cat, a ham, a yak, a yam, a hat, a canal-Panama!')).to be(true)
  end

  it 'should return false if the input has punctuation and it is a palindrome' do
    expect(is_palindrome?('my, cat')).to be(false)
  end

  # handling not valid input

  it "should raise an error if given an int" do
    expect { is_palindrome?(131) } .to raise_error(ArgumentError)
  end

  it 'should raise an arrer if given nil' do
    expect { is_palindrome?(nil) }.to raise_error(ArgumentError)
  end

  it 'should raise error if given an empty string' do
    expect { is_palindrome?('') }.to raise_error(ArgumentError)
  end
end
