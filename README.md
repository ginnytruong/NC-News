# Northcoders News API

## Project Summary
Using Javascript and SQL, I have set up a restful API to perform GET, PATCH, POST and DELETE requests to the PostgreSql database.

### Hosted on Render
Link to the hosted version here: https://ginny-nc-news.onrender.com


## Set Up
### Note to Developers
To establish connection with the databases, two environment (.env) files must be set up initally. 
Create .env.development and .env.test files each containing "PGDATABASE=" followed by the respective database name.
Once environment files are set up, install dotenv.


For a local copy of this API, please follow the below instructions:
- fork and clone this Github repo
- run "npm install" to install required dependancies
- run "npm setup-dbs" followed by "npm run-seed" to seed local database
- ensure that .env files have been set up according to above instructions
- use psql commands to view database
- run "npm t" to execute tests

### Version Requirements
Node v21.2.0 or higher &
PostgresQL 16 or higher