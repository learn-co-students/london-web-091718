require_relative '../config/environment.rb'

def reload
  load 'config/environment.rb'
end

dan = Guest.new('Daniel')
oliver = Guest.new('Oliver')
ryan = Guest.new('Ryan')
adrian = Guest.new('Adrian')
dina = Guest.new('Dina')

london = Listing.new('London')
moscow = Listing.new('Moscow')
warsaw = Listing.new('Warsaw')
madrid = Listing.new('Madrid')
amsterdam = Listing.new('Amsterdam')

t2 = Trip.new(dan, london)
t3 = Trip.new(dan, warsaw)
t4 = Trip.new(dan, london)
t5 = Trip.new(oliver, moscow)
t6 = Trip.new(ryan, london)
t7 = Trip.new(oliver, madrid)
t8 = Trip.new(adrian, london)
t9 = Trip.new(dina, amsterdam)

Pry.start
