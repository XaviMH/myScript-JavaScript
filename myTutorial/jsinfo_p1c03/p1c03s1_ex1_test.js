describe("pow", function() {

  describe("raises 2 to power 3", function() {
    it("2 raised to power 3 is 8", function() {
      assert.equal(pow(2, 3), 8);
    });
  });

  describe("raises 3 to power 4", function() {
    it("3 raised to power 4 is 81", function() {
      assert.equal(pow(3, 4), 81);
    });
  });

  describe("raises x to power 3", function() {
    for (let x = 1; x <= 5; x++) {
      makeTest(x);
    }
  
    function makeTest(x) {
      let expected = x * x * x;
      it(`${x} in the power 3 is ${expected}`, function() {
        assert.equal(pow(x, 3), expected);
      });  
    }
  });

  describe("raises to negative numbers, and non-integers", function() {
    it("for negative n the result is NaN", function() {
      assert.isNaN(pow(2, -1));
    });

    it("for non-integer n the result is NaN", function() {
      assert.isNaN(pow(2, 1.5));
    });
  });


});