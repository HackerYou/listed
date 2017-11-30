process.env.NODE_ENV = "test";

let mongoose = require('mongoose');
let List = require('../controllers/models/list');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('Lists', () => {

  beforeEach((done) => { // before each test db is emptied 
    List.remove({}, (err, model) => {
      done();
    });
  });


// test the GET route


  it('it should get ALL the lists', (done) => {
    chai.request(server)
      .get('/list')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('array');
        res.body.length.should.be.eql(0);
      done();
      });
  });


// test the POST route


  it('should not POST a list without a title field', (done) => {
    let list = {
      items: []
    }

    chai.request(server)
      .post('/list')
      .send(list)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('errors');
        res.body.errors.should.have.property('title');
        res.body.errors.title.should.have.property('kind').eql('required');
      done();
      })
  });

  it('should POST a list', () => {
    let list = {
      title: "A New List!"
    }
    chai.request(server)
      .post('/list')
      .send(list)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.list.should.be.a('object');
        res.body.list.should.have.property('title');
      });
  });

  it('should GET a list by id', (done) => {
    let list = new List({title: "A New List"});
    list.save((err, list) => {
      chai.request(server)
        .get('/list/' + list._id)
        .send(list)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('title');
          res.body.should.have.property('_id').to.equal(`${list._id}`);
        done();
        })
    })
  })




});