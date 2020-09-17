const express = require("express");
const router = express.Router();
// const router = require("express").Router()
const db = require("../models");

const Restaurant = require('../models/Restaurant.js');


//routes


// new route
router.get("/new", function (req, res) {
    res.render("restaurant/new.ejs");
});

//index route
router.get("/", (req,res) => {
    db.Restaurant.find({}, function (error, foundRestaurant) {
        if (error) return res.send(error);
        const context = {
            restaurant: foundRestaurant,
        };
        res.render("restaurant/index", context);
    });
});



//create
router.post('/', (req, res)=>{
    Restaurant.create(req.body, (error, createdRestaurant)=>{
        res.redirect('/restaurants');
    });
});

// show
router.get("/:id", function (req, res) {
    db.Restaurant.findById(req.params.id)
      .populate("dishes")
      .exec(function (err, foundRestaurant) {
        if (err) {
          console.log(err);
          return res.send(err);
        }
        const context = { restaurant: foundRestaurant };
        res.render("restaurant/show", context);
      });
  });

  // edit <- view
router.get("/:id/edit", function (req, res) {
    db.Restaurant.findById(req.params.id, function (err, foundRestaurant) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
      const context = { restaurant: foundRestaurant};
      res.render("restaurant/edit", context);
    });
  });
  
  // update <- db change
  router.put("/:id", function (req, res) {
    db.Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (
      err,
      updatedRestaurant
    ) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
  
      res.redirect(`/restaurants/${updatedRestaurant._id}`);
    });
  });
  
  // delete
  router.delete("/:id", function (req, res) {
    db.Restaurant.findByIdAndDelete(req.params.id, function (err, deletedRestaurant) {
      if (err) {
        console.log(err);
        return res.send(err);
      }
  
      db.Dishes.remove({ restaurant: deletedRestaurant._id }, function (
        err,
        removedDishes
      ) {
        if (err) {
          console.log(err);
          return res.send(err);
        }
        res.redirect("/restaurants");
      });
    });
  });

module.exports = router;