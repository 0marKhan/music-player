# Roam music player

## Lets you add and listen to songs, create playlists, search for songs added in the player and more

## [View the website live](https://music-player-roam.netlify.app/)

This is a mern stack project, built because I was always interested in trying to make a music player. The website was built using these steps

<p align="center">
    <img src="./prime-place.png" alt="website image" width="1347"  border="10"/>
</p>

- fetching the data from the Bayut API after registering on the site
- loading that data and storing it into redux store
- redux persist is used to rehydrate the Redux store across page reloads or restarts
- only rerendering the API call if the redux store is empty to prevent unnecessary API calls, as the Bayut API has limited calls per month (500 fixed)
- two calls are made to the API, the first one to estates on rent and the second to estates on sale which are then displayed to the user
- routing for multiple pages to show home, rent estates and estates for sale done using react-router-dom
- If an estate is clicked it leads to another page that gives description of the estate
