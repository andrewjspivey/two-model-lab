const express = require("express");
const router = express.Router();
// const router = require("express").Router()
const db = require("../models");

const Restaurant = require('../models/Restaurant.js');


//routes



router.get("/new", function (req, res) {
    res.render("restaurant/new.ejs");
});

router.get("/", (req,res) => {
    db.Restaurant.find({}, function (error, foundRestaurant) {
        if (error) return res.send(error);
        const context = {
            restaurant: foundRestaurant,
        };
        res.render("restaurant/index", context);
    });
});

router.get('/', (req, res)=>{
	res.render('restaurant/index.ejs');
});

router.get('/', (req, res)=>{
	Restaurant.find({}, (error, foundRestaurants)=>{
		res.render('restaurant/index.ejs', {
			restaurants: foundRestaurants
		});
	})
});

router.post('/', (req, res)=>{
    Restaurant.create(req.body, (error, createdRestaurant)=>{
        res.redirect('/restaurants');
    });
});



module.exports = router;