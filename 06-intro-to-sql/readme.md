# Intro to SQL

1. Install the SQLite Browser if you haven't already [here](http://sqlitebrowser.org/)
2. Open the SQLite Browser and click 'File -> Open DataBase'
3. Choose the `chinook.db` file from this repo. This database is open source and maintained by Microsoft (SQL is no fun if you don't have any data)
4. Click the tab that says 'Execute SQL'. Type SQL queries in the box above. Press the play button. See the results of that query in the box below

## so, sql...

SQL stands for Structured Query Language and is a language that allows us to do:

Store / persist information
Manipulate that information
SQLite3 is a relational database.

Some specific actions that we can do are CRUD actions, a common acronym we'll see throughout the program, web development, and computing in general:

- Create data
- Read data
- Update data
- Delete data

Do you see the connection between object relationship lectures from last week and table relationships? 

Have you heard of joins?

## to format your sqlite3 output, run these:

```sql
.mode column
.headers on

```

## A word on SQL joins

[coding horror](https://blog.codinghorror.com/a-visual-explanation-of-sql-joins/)
[seldom matt](http://blog.seldomatt.com/blog/2012/10/17/about-sql-joins-the-3-ring-binder-model/)

## Challenges

1. Write the SQL to return all of the rows in the artists table?

```SQL
SELECT * FROM artists;
```

2. Write the SQL to select the artist with the name "Black Sabbath"

```SQL
SELECT * FROM artists WHERE artists.name = "Black Sabbath"
```

3. Write the SQL to create a table named 'fans' with an autoincrementing ID that's a primary key and a name field of type text

```sql
CREATE TABLE fans (
  id INTEGER PRIMARY KEY,
  name TEXT
);
```

4. Write the SQL to alter the fans table to have a artist_id column type integer?

```sql
ALTER TABLE fans ADD COLUMN artist_id INTEGER;
```

5. Write the SQL to add yourself as a fan of the Black Eyed Peas? ArtistId **169**

```sql
INSERT INTO fans (name, artist_id) VALUES ("Louis", 169);
```

6. Alternative solution

```sql
INSERT INTO fans (name, artist_id) VALUES ("Rishi", SELECT (ArtistId) FROM artists WHERE artists.name = "Black Eyed Peas");
```

7. Write the SQL to return fans that are not fans of the black eyed peas.

```sql
SELECT name FROM fans WHERE fans.artist_id != 169;
```

8. Write the SQL to display all artists's names next to their album titles

```sql
SELECT artists.Name, albums.Title from artists INNER JOIN albums ON artists.ArtistId = albums.ArtistId;
```

