require 'sqlite3'
require 'pry'
# require_relative 'artist'
#OBJECT RELATIONAL MAPPING


# execute("INSERT INTO artists (name) VALUES")

DB = { :conn => SQLite3::Database.new('./artists.db') }
DB[:conn].results_as_hash = true

# if !database_exists
#   create_database
# end
# return connection_to_database

# SCHEMA IS
# (id, name)

def create_table
  sql = <<-SQL
    CREATE TABLE artists (id integer primary key, name text);
  SQL

  DB[:conn].execute(sql)
end

def destroy_table
  sql = <<-SQL
    DROP TABLE artists;
  SQL

  DB[:conn].execute(sql)
end

def create_artist(name)
  sql = <<-SQL
    INSERT INTO artists (name) VALUES (?);
  SQL

  DB[:conn].execute(sql, name)
end

def read_artist(name)
  sql = <<-SQL
    SELECT * FROM artists WHERE name=?
  SQL

  DB[:conn].execute(sql, name)
end

def update_artist(name, new_name)
  sql = <<-SQL
    UPDATE artists SET name=? WHERE name=?;
  SQL

  DB[:conn].execute(sql, new_name, name)
end

def delete_artist(name)
  sql = <<-SQL
    DELETE FROM artists WHERE name=?;
  SQL

  DB[:conn].execute(sql, name)
end

Pry.start
