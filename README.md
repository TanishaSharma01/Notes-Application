# Notes-App
## By Tanisha Sharma
A Notes App created using Java and Springboot for backend and Angular, HTML, CSS and TypeScript for frontend. 

## Backend:

• NotesController would handle notes and UserController would handle users.

• Two tables, Notes and Users would get created in 'notesdb' database in MySql Workbench.

• A Scheduler would delete notes other than the top 10 recent notes of a user on an hourly basis. 

## Frontend:

• A user can register and login.

• A user can view, create, save, and delete their notes.

• Home page would show total number of users as well as total number of notes across all the users.

• A user can view their top 10 recent notes and the older notes would get deleted hourly.

# Setup Guide 

## Backend 
1. Navigate to NotesBackend directory.
2. Open the project in Eclipse workspace.
3. Right click on the project name--> Run as --> Spring Boot app.
4. App would run on "https://localhost:8088" port. 
  
## Frontend
1. Navigate to NotesFrontend directory.
2. Open the project in Visual Studio Code.
3. Go to toolbar --> terminal --> Open new terminal.
4. Run "npm install" to install the node_modules.
5. Now to run the project --> Run "ng serve" on terminal.
6. Open URL "https://localhost:4200" on a browser.
