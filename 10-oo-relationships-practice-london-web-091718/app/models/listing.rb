class Listing
    attr_accessor :name

    @@all = []

    def initialize(name)
        @name = name
        @@all << self

    end

    def self.all
        @@all
    end

    def guests
        trips.map {|t| t.guest }.uniq
    end

    def trips
        Trip.all.select {|t| t.listing == self}
    end

    def trip_count
        trips.length
    end

    def self.most_popular
        Listing.all.max_by {|l| l.trip_count}
        # get all the listings
        # count occurences (we've got the trip_count methods)
        # create an array of listings with a trip_count as a isntance variable
        # return the maximum
    end
end
