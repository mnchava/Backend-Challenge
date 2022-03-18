const app = require("./app");
const supertest = require("supertest");
const request = supertest(app);

it("Testing to see if Jest works", () => {
  expect(1).toBe(1);
});

it("GET on /", async (done) => {
  const response = await request.get("/");

  expect(response.statusCode).toBe(200);
  done();
});

describe("alpha endpoint", () => {
  it("PUT on /alpha", async (done) => {
    const response = await request.put("/alpha").send({
      fruit: "apple",
      animal: "zebra",
      "city-list": ["sunnyvale", "sanjose"],
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      animal: "zebra",
      "city-list": ["sunnyvale", "sanjose"],
      fruit: "apple",
    });
    done();
  });

  it("GET on /alpha", async (done) => {
    const response = await request.get("/alpha").send({
      fruit: "apple",
      animal: "zebra",
      "city-list": ["sunnyvale", "sanjose"],
    });

    expect(response.statusCode).toBe(404);
    done();
  });
});

describe("flatten endpoint", () => {
  it("POST on /flatten: only strings", async (done) => {
    const response = await request.post("/flatten").send({
      fruit: "apple",
      animal: "zebra",
      "city-list": ["sunnyvale", "sanjose"],
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      fruit: "apple",
      animal: "zebra",
      "city-list": "sunnyvale,sanjose",
    });
    done();
  });

  it("POST on /flatten: strings and numbers", async (done) => {
    const response = await request.post("/flatten").send({
      "city-list": ["sunnyvale", "sanjose"],
      members: ["George", "Lucy", "Joan"],
      ages: [23, 33, 28],
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      "city-list": "sunnyvale,sanjose",
      members: "George,Lucy,Joan",
      ages: "23,33,28",
    });
    done();
  });
});

describe("quote endpoint", () => {
  it("GET on /quote", async (done) => {
    await request.get("/quote").expect(404);

    done();
  });

  it("POST on /quote", async (done) => {
    const response = await request.post("/quote").expect(200);

    expect(response.body.author).toBeTruthy();
    expect(response.body.en).toBeTruthy();
    expect(response.body.id).toBeTruthy();

    done();
  });
});

describe("quotes endpoint", () => {
  it("GET on /quotes", async (done) => {
    const response = await request
      .get("/quotes")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200);

    done();
  });

  it("GET on /quotes: author not in quotes array", async (done) => {
    const response = await request
      .get("/quotes")
      .expect("Content-Type", "application/json; charset=utf-8")
      .expect(200);

		const key = Object.keys(response.body)[0];
    expect(response.body[key].author).toBeFalsy();;
    done();
  });
});
