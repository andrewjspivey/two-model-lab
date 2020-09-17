const express = require("express");
const router = express.Router();
// const router = require("express").Router()
const db = require("../models");

//const Dishes = require('../models/Dishes.js');



router.get("/", function (req, res) {
    db.Dishes.find({}, function (error, foundDishes) {
        if (error) return res.send(error);
        
        const context = {
            dishes: foundDishes,
        };
        
        res.render("dishes/index", context);
    });
});

router.get("/new", function (req, res) {
    db.Restaurant.find({}, function (err, foundRestaurants) {
      if (err) return res.send(err);
  
      const context = {
        restaurants: foundRestaurants,
      };
  
      res.render("dishes/new", context);
    });
  });

// create
router.post("/", function (req, res) {
    console.log(req.body);
    db.Dishes.create(req.body, function (err, createdDish) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      db.Restaurant.findById(req.body.restaurant, function (err, foundRestaurant) {
        if (err) {
          console.log(err);
          return res.send(err);
        }
  
        foundRestaurant.dishes.push(createdDish);
        foundRestaurant.save(); // important because this commits the Restaurant back to the db
  
        res.redirect("/dishes");
      });
    });
  });

// show
router.get("/:id", function (req, res) {
    db.Dishes.findById(req.params.id, function (err, foundDishes) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      const context = { dish: foundDishes };
      res.render("dishes/show", context);
    });
  });

module.exports = router;