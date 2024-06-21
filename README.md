# DJS11 - Podcast App

A fully functional podcast app built with React and Redux Redux Toolkit. Deployed to Netlify.

## Run the code

- Clone the repository and navigate to the root directory.
- Run `npm install`
- Run `npm run dev`
- Visit the link provided by the terminal.

Alternatively visit the [Netlify link](https://muse-halval360.netlify.app) to view the app on netlify.

## File Structure

- `src` (Folder):

  - `components` : Folder containing all the main components built during this project that were not directly built in a page route.
    - `audioPlayer`: Folder which has the AudioPlayer component and styling.
    - `dropdown`: Folder containing dropdown menu's built which were re-used on multiple pages.
    - `episode`: Folder containing the component and styling to render the individual episodes of a show.
    - `navigation`: Folder containing the Main Navigation component as well as buttons and logic reused for navigating through the app.
    - `podcastDetails`: Folder containing the main show view component for the podcast shows.
    - `previews`: Folder containing the components for the show previews on the Home and Specific Genre page.
    - `seasons`: Folder containing the season dropdown functionality.
    -
  - `pages`: Contains the main pages that are linked to Route paths:

    - `Layout`: Shared navigation bar
    - `Show`:
    - - `Show`: Shows episode details and seasons with dropdown
      - `Season`: View for individual season episodes
    - `ErrorPage`: Error page
    - `Favourites`: Page displays episodes favourited by the user, grouped by show and season.
    - `Genre`: Page for a specific Genre.
    - `Home`: Page displays recommended shows carousel and show previews.
    - `Search`: Page which displays links to different genres and a search feature to find a particular show/podcast.

  - `store`

    - `loadState` and `Middleware`: Configuration to link redux state to local storage.
    - `favouritesSlice`: Reducer (State management for Favourites feature.)
    - `playbackSlice`: Reducer (State management for media player featurs.)
    - `store`: Configuration for redux store.

  - `utils`

    - `genreTypes`, `loaders` and `utils` - Functions and data used.

  - `App`
  - `index.css`
  - `main.jsx`
  - `index.html`

## Technologies used

- Vite
- React
- Redux
- Redux Toolkit
- Font Awesome
- Netlify (for deployment)

### Languages

- Javascript JSX
- CSS/ CSS modules

## CORE PROJECT REQUIREMENTS ✅

| CODE  | CATEGORY                           | USER STORIES                                                                                                                                                                                                   | DIFFICULTY | TOTAL |
| ----- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ----- |
| P3.1  | Setup and Deployment               | Project is deployed to a custom Netlify URL                                                                                                                                                                    | Medium     | 2     |
| P3.2  |                                    | User sees a custom icon in the tab window. All favicon information has been created an added correctly via realfavicongenerator.net                                                                            | Easy       | 1     |
| P3.3  |                                    | Metatag information has been created and added via metatags.io. Be mindful to manually replace all URL values (especially image URL) to absolute Netlify URL values (you will need to deploy to Netlify first) | Easy       | 1     |
| P3.4  | UI/UX                              | User sees the name of all available shows on the platform                                                                                                                                                      | Easy       | 1     |
| P3.5  |                                    | User sees shows sorted alphabetically when the app loads (default sorting)                                                                                                                                     | Hard       | 3     |
| P3.6  |                                    | User has a way to listen to any episode in a season for a show (note there is a single placeholder audio track for all shows)                                                                                  | Medium     | 2     |
| P3.7  |                                    | User is able to see a view where only episodes for a specific selected season are shown (Note that this can be a page view, a modal, or toggle dropdown - up to developer's design choice)                     | Medium     | 2     |
| P3.8  |                                    | User is able to toggle between different seasons for the same show                                                                                                                                             | Hard       | 3     |
| P3.9  |                                    | User sees preview image of shows when browsing                                                                                                                                                                 | Easy       | 1     |
| P3.10 |                                    | User sees the amount of seasons as a number in a show when browsing                                                                                                                                            | Easy       | 1     |
| P3.11 |                                    | User sees a human-readable date to when a show was last updated                                                                                                                                                | Easy       | 1     |
| P3.12 |                                    | User sees what genres (as genre titles) a show is associated with when browsing                                                                                                                                | Medium     | 2     |
| P3.13 |                                    | User sees a preview image of seasons for a specific show (Note some Shows have different images for each Season)                                                                                               | Easy       | 1     |
| P3.14 |                                    | User sees the amount of episodes as a number for a season                                                                                                                                                      | Easy       | 1     |
| P3.15 |                                    | User is able to go back to a show view from a season-specific view                                                                                                                                             | Easy       | 1     |
| P3.16 | Data Fetching and State Management | All show data loaded via a fetch call from the API (Note no podcast data should be hardcoded in the application)                                                                                               | Medium     | 2     |
| P3.17 |                                    | When viewing a specific show, data is loaded via fetch from individual show endpoint                                                                                                                           | Medium     | 2     |
| P3.18 |                                    | There is a loading state while initial data is being loaded                                                                                                                                                    | Medium     | 2     |
| P3.19 |                                    | There is a loading state while new data is being loaded                                                                                                                                                        | Hard       | 3     |
| P3.20 | User Interaction                   | User is able to mark specific episodes as favourites so that they can find them again (Note the requirement is that a specific episode of a specific season of a specific show is to be favourited)            | Hard       | 3     |
| P3.21 |                                    | User can visit a view where they see all their favourite episode                                                                                                                                               | Hard       | 3     |
| P3.22 |                                    | User is able to see the associated show and season when an episode is in favourites                                                                                                                            | Hard       | 3     |
| P3.23 |                                    | Related by season/show episodes are grouped together in favourites                                                                                                                                             | Hard       | 3     |
| P3.24 |                                    | User is able to remove episodes from their favourites                                                                                                                                                          | Medium     | 2     |
| P3.25 |                                    | User sees the date and time that they added something as a favourite                                                                                                                                           | Medium     | 2     |
| P3.26 |                                    | User is able to arrange favourites based on title from A-Z                                                                                                                                                     | Medium     | 2     |
| P3.27 |                                    | User is able to arrange favourites based on title from Z-A                                                                                                                                                     | Medium     | 2     |
| P3.28 |                                    | User is able to arrange favourites starting with the most recently updated                                                                                                                                     | Medium     | 2     |
| P3.29 |                                    | User is able to arrange favourites starting with the furthest back updated                                                                                                                                     | Medium     | 2     |
| P3.30 |                                    | User is able to arrange lists of shows based on title from A-Z                                                                                                                                                 | Medium     | 2     |
| P3.31 |                                    | User is able to arrange lists of shows based on title from Z-A                                                                                                                                                 | Medium     | 2     |
| P3.32 |                                    | User is able to arrange list showing the most recently updated (Newly updated Shows)                                                                                                                           | Medium     | 2     |
| P3.33 |                                    | User is able to arrange list of shows from least recently updated (Oldest updated Shows)                                                                                                                       | Medium     | 2     |
| P3.34 |                                    | Audio player is always visible so that user can listen to episodes while browsing                                                                                                                              | Medium     | 2     |
| P3.35 |                                    | Audio player must show listening progress                                                                                                                                                                      | Medium     | 2     |
| P3.36 |                                    | User receives a notification that confirms they want to close the page when audio is playing                                                                                                                   | Medium     | 2     |
| P3.37 |                                    | User can filter shows by genre                                                                                                                                                                                 | Hard       | 3     |
| P3.38 | Persistence and Storage            | App remembers and shows what episodes user listened to all the way through.                                                                                                                                    | Hard       | 3     |
| P3.39 |                                    | Favourites must be persisted in localStorage                                                                                                                                                                   | Hard       | 3     |
| P3.40 |                                    | User has the option to "reset" all their progress, effectively removing their entire listening history. (Note marks are awarded only for "resetting" entire listening history)                                 | Hard       | 3     |
| P3.41 | Overall Assessment                 | The project has a good appearance and Desktop layout when opened in a web browser.                                                                                                                             | Easy       | 3     |
| P3.42 |                                    | The project is easy to navigate and interact with through a web browser.                                                                                                                                       | Easy       | 3     |
| P3.43 |                                    | The project's commit history shows short and clear commit messages.                                                                                                                                            | Easy       | 3     |
| P3.44 |                                    | The project displays well on different devices and all screen sizes, ensuring usability on tablets                                                                                                             | Hard       | 4     |
| P3.45 |                                    | The README file includes a comprehensive introduction to the project, setup instructions, usage examples, and contact information.                                                                             | Easy       | 3     |
| P3.46 |                                    | The project loads and functions without ANY bugs (Completed user stories possess no bugs whatsoever)                                                                                                           | Hard       | 4     |
| P3.47 |                                    | Well organized project structure & clean readable code                                                                                                                                                         | Medium     | 3     |

# STRETCH GOALS 💪

| CODE  | CATEGORY            | USER STORIES                                                                                                | DIFFICULTY | TOTAL |
| ----- | ------------------- | ----------------------------------------------------------------------------------------------------------- | ---------- | ----- |
| P3.48 | Additional Features | The project has extra features that make for a good user-experience                                         | Hard       | 3     |
| P3.49 |                     | User is presented with a sliding carousel of possible shows they might be interested in on the landing page | Hard       | 3     |
| P3.50 |                     | User is able to filter shows based on title by means of a text input                                        | Hard       | 3     |
| P3.51 |                     | User is able to find shows based on fuzzy matching of concepts                                              | Hard       | 3     |
| P3.52 |                     | App displays the exact timestamp location of where they left off any episode                                |
