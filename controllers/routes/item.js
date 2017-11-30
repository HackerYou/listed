let mongoose = require('mongoose');
let Item = require('../models/item');
let List = require('../models/list');


function postItemToList(req, res) {
  let listId = req.params.listId;

  let newItem = new Item({
    item: req.body.item,
    belongs_to: listId,
    created_at: Date.now()
  });

  newItem.save((err, item) => {
    if (err) {
      res.send(err)
    } else {
      res.json({ message: 'Item successfully added!', item });

      let itemId = item._id;

      List.find({_id: listId}, (err, list) => {
        if(err)
          console.log(err);
          
        let listUpdate = list[0];
        listUpdate.items.push(itemId);
        List.findOneAndUpdate({_id: listId}, listUpdate, {new: true}, (err, list) => {
          if(err)
            res.send(err);
        })
      })
    }
  });

}


function updateItemById(req, res) {
  let itemId = req.params.itemId;
  let updates = req.body;


  Item.findOneAndUpdate({ _id: itemId}, updates, {new: true},  (err, item) => {

    if (err) {
      res.send({
        error: err
      });
    } else {
      res.send({
        message: 'item updated!',
        item
      })
    }  
  })
}

module.exports = { postItemToList, updateItemById };