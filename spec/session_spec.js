describe("Session", function() {

  // data gathered from py-srp and ruby-srp
  var old_compare = {
    username: "UC6LTQ",
    password: "PVSQ7DCEIR0B",
    salt: "d6ed8dba",
    v: "c86a8c04a4f71cb10bfe3fedb74bae545b9a20e0f3e95b6334fce1cb3384a296f75d774a3829ffd63f405f13f58ffbae415fd234b08b996c11e8618c17961defcebb1d244b388b75cf36882ee97182a900ebeaf7cffa0a83eed294f3a9449a06beb88954952759d2957b80ef851f4cc4fcaa6001fee4f00c273ecdd712d48371",
    aa: "4decb8543891f5a744b1e9b5bc375a474bfe3c5417e1db176cefcc7ba915338a14f309f8e0a4c7641bc9c9b9bd2e91c4d1beda1772c30d0350c9ba44f7c5911dfe6bb593ac2a2b30f1f6e5ec8a656cb4947c1907cf62f8d7283cbe32eb44b02158b51091ae130afa6063bb28cdea9ae159d4f222571e146f8715bfa31af09868",
    a: "d498c3d024ec17689b5320e33fc349a3f3f91320384155b3043fa410c90eab71",
    bb: "5f5bedd1f95b6b0d6809614f162e49753acce6979e1041f4da5bfa91e1dadd2a5470270ed102a49c5f74fd42f2b61a8a1a43218159a22b31a7cbd4670679480e56d0e4e72a22c07e07102ff063045d0c3c96085dec1cc2959453e0299890bd95af76403cec6ec5f212667a75ae6f4a8327183d72c3ee85792ca43820fbccf244",
    m: "bc30b8781e67a657e93d0a6cf7e7847fc60f79e2b0641e9c26b3522bc8f974cc"
  }

  // login attempt with correct password that failed never the less:
  var compare = {
    username: "blues",
    password: "justtest",
    salt: "6a6ef9ce5cb998eb",
      v: "a5da6d376d503e22d93385db0244c382d1413d9f721ad9866dfc5e895cf2a3331514ceec5f48aceab58b260651cc9ee1ba96d906f67a6b4a7414c82d1333607ebe96403ecc86050224dc4c17b1d30efdbb451a68d1b6a25cce10f0e844082329d3cb46e1c3d46298a0de2cd3b8c6acc1a80c206f0f10ec8cd3c050babdf338ba",
    aa: "4decb8543891f5a744b1e9b5bc375a474bfe3c5417e1db176cefcc7ba915338a14f309f8e0a4c7641bc9c9b9bd2e91c4d1beda1772c30d0350c9ba44f7c5911dfe6bb593ac2a2b30f1f6e5ec8a656cb4947c1907cf62f8d7283cbe32eb44b02158b51091ae130afa6063bb28cdea9ae159d4f222571e146f8715bfa31af09868",
    a: "d498c3d024ec17689b5320e33fc349a3f3f91320384155b3043fa410c90eab71",
    bb: "dee64fd54daafc18b338c5783ade3ff4275dfee8c97008e2d9fb445880a2e1d452c822a35e8e3f012bc6facaa28022f8de3fb1d632667d635abde0afc0ca4ed06c9197ea88f379042b10bc7b7f816a1ec14fefe6e9adef4ab904315b3a3f36749f3f6d1083b0eb0029173770f8e9342b098298389ba49a88d4ea6b78a7f576a4",
    s: "50973f6e8134f95bd04f54f522e6e57d957d0640f91f0a989ff775712b81d5856ae3bdd2aa9c5eda8019e9db18065519c99c33a62c7f12f98e7aed60b153feee9ab73ba1272b4d76aa002da8cd47c6da733c88a0e70d4c3d6752fd366d66efe40870d26fd5d1755883b9489721e1881376628bf6ef89902f35e5e7e31227e2f",
    k: "dd93e648abfe2ac6c6d46e062ded60b31ec043e55ceca1946ec29508f4c68461",
    m: "ccf0c492f715484dc8343e22cd5967c2c5d01de743c5f0a9c5cfd017db1804c"
  };

  var session;

  beforeEach(function() {
    session = new srp.Session(compare.username, compare.password);
  });

  it("has the proper username", function() {
    expect(session.getI()).toBe(compare.username);
  });

  it("calculates the proper M", function() {
    session.calculateAndSetA(compare.a);
    session.calculations(compare.salt, compare.bb);
    expect(session.getS().toString(16)).toBe(compare.s);
    // failing from here on...
    expect(session.key()).toBe(compare.k);
    expect(session.getM()).toBe(compare.m);
  });
});