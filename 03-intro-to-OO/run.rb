require 'pry'

class Hospital
  attr_accessor :name, :address, :size, :colour, :n_emp

  def initialize(name, address, size, n_emp)
    @name = name
    @address = address
    @size = size
    @n_emp = n_emp
  end

  def self.do_the_ambulance_sound
    'eeeeooooooeeeeeoooooeeeeoo'
  end

  def describe_hospital
    "name: #{@name}, size: #{@size}"
  end
end


uch = Hospital.new('University College Hospital', 'NW203', 'big', 3834)
wittington = Hospital.new('Wittington Hospital', 'SE3250', 'medium', 134)
dans_clinic = Hospital.new('Dr dan clinic', 'dont come, please', 'tiny', 1)

hospitals = [ uch, wittington, dans_clinic ]

binding.pry
p 'eof'
