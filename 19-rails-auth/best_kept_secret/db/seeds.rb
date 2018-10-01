# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create([
  { username: "Daniel", password: "daniel", admin: true, secret: "I sleep in a Pink Panther onesie" },
  { username: "Rishi", password: "rishi", admin: true, secret: "I like pudding more than I care to admit." },
  { username: "John", password: "john", admin: false, secret: "I often eats grapes like a wild, starved racoon" },
  { username: "Josie", password: "josie", admin: false, secret: "I talk to trees" },
  { username: "Becky", password: "becky", admin: false, secret: "I can't swim :(" },
  { username: "Joshua", password: "joshua", admin: false, secret: "I like to chase cows" },
  { username: "Ursula", password: "ursula", admin: false, secret: "I hail taxis and then promptly run away" }
])
