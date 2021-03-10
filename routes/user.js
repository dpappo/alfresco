const express = require('express');
const router = express.Router();
const app = express();
const { addPoint, getMarkersFromDB, getFavoriteMarkers, addFavorite, removeFavorite, getMyMarkers, getLocationById, editPoint, deletePoint, getUserByID } = require('../public/scripts/dbQuery');




module.exports = (db) => {
  router.get("/points", (req, res) => {
    res.render('my_points');
  });

  router.get("/favorites", async (req, res) => {
    if (req.session.user_id === null) {
      res.redirect("/login");
    } else {
      const currentUser = req.session.user_id;
      const markers = await getFavoriteMarkers(currentUser);
      const templateVars = { coords: markers }
      res.render("my_map", templateVars)

    }
  });

  router.get("/profile", async(req, res) => {
    const ID = req.session.user_id;
    const userInfo =  await getUserByID(ID);
    const templateVars = { user: userInfo };

    res.render('profile', templateVars);
  });

  router.get("/addpoint", (req, res) => {
    res.render('addpoint');
  });

  router.get("/mypoint", async (req, res) => {
    if (req.session.user_id === null) {
      res.redirect("/login")
    } else {
      const currentUser = req.session.user_id;
      const markers = await getMyMarkers(currentUser);
      console.log(markers);
      const templateVars = { coords: markers }
      res.render("my_points", templateVars)

    }
  });

  router.post("/addpoint", (req, res) => {
    const point = req.body;
    const user = req.session.user_id;
    addPoint(point, user);
    res.redirect("/");

  })

  router.post("/favorite", (req, res) => {
    const point = req.body.locations_id;
    console.log("point: ", point)
    const user = req.session.user_id;
    addFavorite(point, user);
    res.redirect("/");

  })

  router.post("/favorite/remove", (req, res) => {
    console.log("in post favorite remove")
    const point = req.body.locations_id;
    console.log("point: ", point)
    const user = req.session.user_id;
    removeFavorite(point, user);
    res.redirect("/");

  })

  router.get("/editpoint/:locations_id", async (req, res) => {
    const id = req.params.locations_id;
    const locationData = await getLocationById(id);
    console.log('location:', locationData)
    console.log(locationData[0].title);
    const templateVars = {
      location: locationData[0],
      locationID: id
    };
    res.render("editpoint", templateVars);
  });

  router.post("/editpoint/:locationID/edit", (req, res) => {
    const point = req.body;
    console.log("editpoint body: ", req.body)
    const pointID = req.params.locationID;
    editPoint(point, pointID);
    res.redirect("/user/mypoint");
  });

  router.post("/editpoint/:locationID/delete", (req, res) => {
    console.log("in delete post")
    const point = req.params.locationID;
    //console.log("req.params", req.params)
    // console.log("req", req)
    const userID = req.session.user_id;
    deletePoint(point, userID);
    res.redirect("/user/mypoint");
  });








  return router;
};
