describe("Session", function() {

  // data gathered from py-srp and ruby-srp
  var compare = {
    username: "UC6LTQ",
    password: "PVSQ7DCEIR0B",
    salt: "d6ed8dba",
    v: "c86a8c04a4f71cb10bfe3fedb74bae545b9a20e0f3e95b6334fce1cb3384a296f75d774a3829ffd63f405f13f58ffbae415fd234b08b996c11e8618c17961defcebb1d244b388b75cf36882ee97182a900ebeaf7cffa0a83eed294f3a9449a06beb88954952759d2957b80ef851f4cc4fcaa6001fee4f00c273ecdd712d48371",
    aa: "4decb8543891f5a744b1e9b5bc375a474bfe3c5417e1db176cefcc7ba915338a14f309f8e0a4c7641bc9c9b9bd2e91c4d1beda1772c30d0350c9ba44f7c5911dfe6bb593ac2a2b30f1f6e5ec8a656cb4947c1907cf62f8d7283cbe32eb44b02158b51091ae130afa6063bb28cdea9ae159d4f222571e146f8715bfa31af09868",
    a: "d498c3d024ec17689b5320e33fc349a3f3f91320384155b3043fa410c90eab71",
    bb: "5f5bedd1f95b6b0d6809614f162e49753acce6979e1041f4da5bfa91e1dadd2a5470270ed102a49c5f74fd42f2b61a8a1a43218159a22b31a7cbd4670679480e56d0e4e72a22c07e07102ff063045d0c3c96085dec1cc2959453e0299890bd95af76403cec6ec5f212667a75ae6f4a8327183d72c3ee85792ca43820fbccf244",
    m: "bc30b8781e67a657e93d0a6cf7e7847fc60f79e2b0641e9c26b3522bc8f974cc"
  }

  var session;

  beforeEach(function() {
    var srp = new SRP(jqueryRest());
    session = new srp.Session(compare.username, compare.password);
  });

  it("has the proper username", function() {
    expect(session.getI()).toBe(compare.username);
  });

  it("calculates the proper verifier", function() {
    expect(session.getV(compare.salt).toString(16)).toBe(compare.v);
  });

  it("calculates the proper A", function() {
    expect(session.calculateAndSetA(compare.a)).toBe(compare.aa);
  });

  it("calculates the proper M", function() {
    session.calculateAndSetA(compare.a);
    session.calculations(compare.salt, compare.bb);
    expect(session.getM()).toBe(compare.m);
  });
});
