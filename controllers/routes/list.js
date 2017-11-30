let mongoose = require('mongoose');
let List = require('../models/list');

function getLists(req, res) {
 List.find({})
  .populate({path: 'items', select: 'item score'})
  .exec((err, lists) => {
    if(err) {
      res.send(err);
    } 
    res.json(lists)
  });

}

function postList(req, res){
  let newList = new List(req.body);

  newList.save((err, list) => {
    if(err){
      res.send(err)
    } else {
      res.json({message: 'List successfully added!', list});
    }
  });
}

function getList(req, res){
  List.findById(req.params.listId, (err, list) => {
    if(err) {
      res.send(err);

    }
    res.json(list);
  })
}

function deleteList(req, res){
  List.remove({_id: req.params.listId}, (err, result) => {
    res.json({message: "list deleted!", result});
  })
}

function updateList(req, res){
  let listId = req.params.listId;
  let updates = req.body;

  List.findOneAndUpdate({ _id: listId }, updates, { new: true }, (err, list) => {
    if (err) {
      res.send({
        error: err
      });
    } else {
      res.send({
        message: 'list updated!',
        list
      });
    }
  });
}

module.exports = { getLists, postList, getList ,deleteList, updateList};