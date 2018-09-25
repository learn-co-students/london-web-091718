require 'sqlite3'
require 'pry'

DB = { :conn => SQLite3::Database.new('./artists.db') }
DB[:conn].results_as_hash = true


class Artist
  attr_accessor :id, :name

  def initialize(id=nil, name)
    @id = id
    @name = name
  end

  def save
    sql = <<-SQL
      INSERT INTO artists (name) VALUES (?);
    SQL

    DB[:conn].execute(sql, @name)
    Artist.find(Artist.get_highest_id)
  end

  def self.create(name)
    a = Artist.new(name)
    a.save
  end

  def self.all
    sql = <<-SQL
      SELECT * FROM artists
    SQL

    DB[:conn].execute(sql).map do |artist_hash|
      Artist.parse_artist(artist_hash)
    end
  end

  def self.find(id)
    sql = <<-SQL
      SELECT * FROM artists WHERE id=?
    SQL

    artist_hash = DB[:conn].execute(sql, id)[0]
    Artist.parse_artist(artist_hash)
  end

  def update(new_name)
    sql = <<-SQL
      UPDATE artists SET name=? WHERE id=?;
    SQL

    DB[:conn].execute(sql, new_name, @id)
    Artist.find(@id)
  end

  def self.delete(id)
    if !Artist.find(id)
      puts "CAN'T DELETE WHAT AINT THERE"
      return false
    end

    sql = <<-SQL
      DELETE FROM artists WHERE id=?;
    SQL

    DB[:conn].execute(sql, id)

    !Artist.find(id)
  end


  def self.get_highest_id
    sql = <<-SQL
      SELECT id FROM artists ORDER BY id DESC LIMIT 1;
    SQL

    DB[:conn].execute(sql, @name)[0]["id"]
  end

  def self.parse_artist(artist_hash)
    if artist_hash
      Artist.new(artist_hash["id"], artist_hash["name"])
    else
      nil
    end
  end
end

Pry.start
