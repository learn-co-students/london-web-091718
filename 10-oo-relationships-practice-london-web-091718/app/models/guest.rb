class Guest
    attr_accessor :name

    @@all = []

    def initialize(name)
        @name = name
        @@all << self
    end

    def self.all
        @@all
    end

    def trips
        Trip.all.select {|t| t.guest == self }
    end

    def listings
        trips.map {|t| t.listing}.uniq
    end

    def trip_count
        trips.length
    end

    def self.pro_traveller
        self.all.select { |g| g.trip_count > 1 }
    end

    def self.find_all_by_name(name)
        self.all.select { |g| g.name == name }
    end

end
