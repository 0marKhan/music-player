# Roam music player

## Lets you add and listen to songs, create playlists, search for songs added in the player and more

## [View the website live](https://music-player-roam.netlify.app/)

This is a mern stack project, built because I was always interested in trying to make a music player. The website was built using these steps

<p align="center">
    <img src="./readme_images/home-page.png" alt="website image" width="1347"  border="10"/>
</p>

## Backend
- Backend was made keeping MVC pattern in mind 
- Made Models in Mongoose for Playlist, Song and User
- Then made routes for authentication (auth), playlist, song and user
- In auth made apis for registering and logging in users
- In playlist made apis for creating a playlist, getting playlists made by me, adding a song to a playlist and deleting a playlist
- In song made apis for creating a song, getting a song by name and getting all songs
- passport is used in routes in which the api calls should only be made by logged in users
- to run the backend 
```sh
nodemon index.js
```
