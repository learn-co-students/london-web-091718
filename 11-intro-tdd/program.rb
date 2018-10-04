def is_palindrome?(string_of_chars)
  if string_of_chars.class != String || string_of_chars.length == 0
    raise ArgumentError.new('Input must be a string')
  end
  string_of_chars.gsub(" ", "").downcase.gsub(/\p{P}/, "") == parsed_input.reverse
end
