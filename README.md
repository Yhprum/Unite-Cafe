## PokemonUnite.App Stats and Forum

This project is made with React with a backend postgresql database

There are two steps to running this project
- start the server with `npm start`
- start the client with `npm start-dev`

To allow the server and client to communicate locally, add `"proxy": "http://localhost:3001"` to `package.json`.
DO NOT COMMIT THIS CHANGE! IT IS ONLY USED IN DEV.

You will need to create a local database to run the forum properly. pgAdmin is a great tool for this - 
https://www.pgadmin.org/ - download this and create a new database. To load the database schema, right click
the schema tab, open the query tool, and paste the contents of db/db_backup.sql into the text field and run it.

You will also need a `.env` file to hold environment variables. It will look a bit like this:

```
JWT_SECRET=arandomstring
DATABASE_URL=postgres://username:password@localhost:5432/db-name
```