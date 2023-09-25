//Use expect & should to write assertions (hypothesize)
const expect = require("chai").expect;
const request = require("supertest");
const app = require("../index");

describe("GET /gifs", function () {
  // Every block of code that starts with it()represents a test.
  it("responds with json", function (done) {
    request(app) //instance of supertest
      .get("/gifs") //performs request to to URL
      .set("Accept", "application/json") //sets http header on request
      // Supertest expect is CHAINED ON
      .expect("Content-Type", /json/) // tests response
      .expect(200, done); //checking to see if status code matches
  });

  it("should return an array", (done) => {
    request(app)
      .get("/gifs")
      .set("Accept", "application/json")
      .end((error, response) => {
        //Chai expect is standalone method
        expect(response.body).to.be.an("array");
        done();
      });
  });

  it("should return an array of objects that have a field called 'name' ", done => {
    request(app)
      .get("/gifs")
      .set("Accept", "application/json")
      .end((error, response) => {
          response.body.forEach(gif => {
            expect(gif).to.have.property('name');
          });
        done()
     });
  });
});

//ONE DESCRIBE BLOCK PER ROUTE
describe("POST /gifs", () => { // test POST request to /gifs
    const newGif = { //must match schema
		"name": "Beyonce Lemonade Gif REPEAT",
		"url": "https://media.giphy.com/media/3o6ozBUuLfzTCngAFi/giphy.gif",
		"tags": ["Beyonce", "Bey"]
	};
  before(done => { // before blocks are executed ONCE before any it() blocks
    request(app)
      .post('/gifs')
      .set('Accept', 'application/json')
      .send(newGif)
      .end(done);
  });
  it('should add a gif object to the collection gifs and return it', done => {
    request(app)
      .get('/gifs')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response.body.find(gif => gif.name === newGif.name)).to.be.an(
          'object'
        );
        done();
      });

  
})})