var express = require('express');
var router = express.Router();
const knex = require('../db/knex');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


   router.post('/', function(req, res, next) {
      userCat = {
         user_id: req.cookies.userId,
         category_id: req.body.category_id
      }
    insertUserCategory(userCat)
        .then(userCategory => {
            res.json(userCategory)
        })
   });

   router.get('/', function(req, res, next) {
     let userId = req.cookies.userId
      knex('user_category')
        .select('category_id')
        .where('user_id', userId)
        .then(data => {
           let catIds = []
           data.map((el) => {
               catIds.push(el.category_id);
           })
           res.json(catIds)
        })
      })

      router.get('/:id', function(req, res, next) {
         knex('user_category')
         .join('categories', 'user_category.category_id', 'categories.id')
           .select('categories.name')
           .where('user_category.user_id', req.params.id)
           .then(data => {
              let catNames = []
              data.map((el) => {
                  catNames.push(el.name);
              })
              res.json(catNames)
           })
         })

// possible delete here
   router.delete('/', function (req, res) {
      let category_id = req.body.category_id
      let userId = req.cookies.userId;
      // console.log('both in del', userId, category_id);
      knex('user_category')
         .where({
            // 'user_id': userId,
            'category_id': category_id
          })
         //  .select(['category_id'])
         .del()
         .then((cat) => {
            // console.log('delcat', cat);
           res.json(cat)
         })
   })


const getUserCategory = (userId) => {
    knex('user_category')
      .select('category_id')
      .where('user_id', userId)
}

const insertUserCategory = (body) => knex('user_category').returning('*').insert(body)

module.exports = router;
