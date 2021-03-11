# Alfresco

Alfresco gives users a map of user-added points, with titles, descriptions, phone numbers, and images. Users can create and save a map of their favourite places, they can add individual listings to their own personal map, and they can see a map of all places added by all users. 

## Motivation

With indoor dining closed all around us, we knew we needed a map-based tool to allow people to share information about their favourite outdoor dining and drinking spots. As students at [Lighthouse Labs](https://www.lighthouselabs.ca/), we took the opportunity to build this project based on a variation of a map-based project option.

## Screenshots

<p align="center">
  <img src="/images/home.png" alt="home page" />
  <img src="/images/search.gif" alt="search feature" />
  <img src="/images/fav.png" alt="favourites page" />
  <img src="/images/mine.png" alt="my points" />
  <img src="/images/loging.png" alt="login page" />
</p>

## Tech/framework used

**Built with** - jQuery, PostgreSQL, Express, Leaflet JS, EJS, SASS, Bootstrap, bcrypt, pg, ❤️

## Features

### Search with built in geocoding and autocomplete

Giving users the option to trigger an API call with either location name or address, dynamically displaying the results of their query, and filling in the Add form on click depending on which result they choose. This was built with jQuery and Position Stack API.

### Secure and authenticated user experience

Encrypted and secure user authenticated user routes allow for personalized experience without worry of tampering from malicious users.

### User modifications

The user can dynamically update their existing points, and jQuery and the database work hand in hand to update those points on the map.

## Installation

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Create a new PostgreSQL database locally, running the schema and seeds in the `/db/` folder. Then record your credentials in a new `.env` file in the root folder.
4. Start the web server using the `npm run local` command. The app will be served at [http://localhost:8080/](http://localhost:8080/).
5. Go to [http://localhost:8080/](http://localhost:8080/) in your browser.

## Dependencies

- Node 10.x or above
- npm 5.x or above
- pg 6.x or above

## Credits

This project was created from skeleton by [Dan Pappo](https://github.com/dpappo), [Jesse Daoust](https://github.com/jessedxi), and [Adam Mohammed](https://github.com/adamm13). 

We could not have done this project without the fantastic team over at [Lighthouse Labs](https://www.lighthouselabs.ca/). 

## License

MIT © Alfresco