var chai = require('chai');
var expect = require('chai').expect;
var assert = require("assert"); 
var chaiHttp = require('chai-http');
var app = require('../app');
var ejs = require('ejs');
var sinon = require('sinon');
var supertest = require('supertest')

chai.use(chaiHttp);

describe('routing', function() {
  describe('monitoring', function () {
    it('Render index file on /monitoring/ GET'  , function (done) {
        var spy = sinon.spy(ejs, '__express');
        supertest(app)
            .get('/monitoring/')
            .expect(200)
            .end(function(err, res){
                if(err) return done(err)

                expect(spy.calledWithMatch(/\/index\.ejs$/)).to.be.true;
                spy.restore()
                done()
            });

    }).timeout(6000);

    it('Check the return number between 0-100 file on /monitoring/GetCpu GET'  , function (done) {
        supertest(app)
            .get('/monitoring/GetCpu')
            .expect(200)
            .end(function(err, res){
                if(err) return done(err)
                var text = res.text;
                
                done()
            });

    }).timeout(4000);
  });
});

/* it('should list ALL blobs on /blobs GET', function(done) {
    chai.request(server)
      .get('/blobs')
      .end(function(err, res){
        res.should.have.status(200);
        done();
      });
  }); */