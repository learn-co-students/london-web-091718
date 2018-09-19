# Ruby Object Oriented Programming

- What is an object?
- Sending messages to objects.
- Creating classes vs instantiating instances
- Differences between the above
- Passing args to `new`
- Instance methods
- instance variables
- Implicit or explicit self
- `attr_` macros
- (each, map, select)
- variable scoping // global scope

### Everything is an Object in Ruby

_"Everything in Ruby is an object."_ What does that mean? Go through some example code, and ask students to break down what's happening at each level:

```ruby
# what is the data type of x?
# what is the value of x?
x = 3
puts x.class
puts x

# what happens when we run this code?
# what is split and where does it come from?
# how does x know what to do with split?
# what's happening when we run this code?
x = "hello how are you"
x.split
```

Methods, on a lower level, are known as "messages" in object-oriented programming. Methods are called _on_ objects and messages are sent _to_ objects. Objects respond to messages by doing some work. The exact work that it should do is _defined_ on the object's class.

[https://ruby-doc.org/core-2.5.0/Object.html\#method-i-send](https://ruby-doc.org/core-2.5.0/Object.html#method-i-send)

```ruby
x = 3

# what does message name mean here?
message_name = :+

# what does send do?
# what does the argument to send specify?
# what other arguments does send take?
x.send(message_name, 1) === x + 1

# most operators in Ruby are just messages sent to objects
names = [
  "Ian",
  "Sophie",
  "JJ",
  "Rishi",
  "Johann",
  "Esmery",
  "Terrance"
]
names[0]
names.[](0)
names.send(:[], 0)

# objects complain when they don't know how to respond to messages
# objects complain when they don't know how to execute methods
names.respond_to_undefined_method

# check if an object responds to a message
names.responds_to? message_name
```

Why is it important to remember everything is an object in ruby? Because everything can respond to a message. If you have a background in C or Java, 1.odd? seems bizarre; know that not all languages have this functionality but we get to use it in ruby.
