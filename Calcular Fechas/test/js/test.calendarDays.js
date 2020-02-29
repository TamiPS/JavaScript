var assert = chai.assert,
    expect = chai.expect;

suite("Testing calcDate", function() {
    test("Test pasado", function() {
        expect(calcDate(new Date('2019-10-27'),10)).to.equal('2019-11-06');
    });
    test("Test pasado", function() {
        expect(calcDate(new Date('2019-06-30'),2)).to.equal('2019-07-02');
    });
    test("Test pasado", function() {
        expect(calcDate(new Date('2017-07-25'),200)).to.equal('2018-02-10');
    });
    test("Test pasado", function() {
        expect(calcDate(new Date('2019-10-27'),-1)).to.equal('2019-10-26');
    });
    test("Test pasado", function() {
        expect(calcDate(new Date('2012-02-28'),3)).to.equal('2012-03-02');
    });
    test("Test pasado", function() {
        expect(calcDate(new Date('2019-01-29'),1168)).to.equal('2022-04-11');
    });
    test("Test pasado", function() {
        expect(calcDate(new Date('2017-07-25'),500)).to.equal('2018-12-07');
    });
    test("Test pasado", function() {
        expect(calcDate(new Date('2019-10-27'),-1000)).to.equal('2017-01-30');
    });
    test("Test pasado", function() {
        expect(calcDate(new Date('2012-02-28'),300)).to.equal('2012-12-24');
    });
    test("Test pasado", function() {
        expect(calcDate(new Date('2019-01-29'),-1168)).to.equal('2015-11-18');
    });
});

suite("Testing getDays", function() {
    test("Test pasado", function() {
        expect(getDays(new Date('2019-10-10'),new Date('2019-10-28'))).to.equal(18);
    });
    test("Test pasado", function() {
        expect(getDays(new Date('2019-06-30'),new Date('2019-07-02'))).to.equal(2);
    });
    test("Test pasado", function() {
        expect(getDays(new Date('2017-07-25'),new Date('2018-02-10'))).to.equal(200);
    });
    test("Test pasado", function() {
        expect(getDays(new Date('2019-10-27'),new Date('2019-10-26'))).to.equal(-1);
    });
    test("Test pasado", function() {
        expect(getDays(new Date('2012-02-28'),new Date('2012-03-02'))).to.equal(3);
    });
    test("Test pasado", function() {
        expect(getDays(new Date('2019-01-29'),new Date('2022-04-11'))).to.equal(1168);
    });
    test("Test pasado", function() {
        expect(getDays(new Date('2017-07-25'),new Date('2022-02-10'))).to.equal(1661);
    });
    test("Test pasado", function() {
        expect(getDays(new Date('2019-10-27'),new Date('2017-10-26'))).to.equal(-731);
    });
    test("Test pasado", function() {
        expect(getDays(new Date('2012-02-28'),new Date('2012-03-01'))).to.equal(2);
    });
    test("Test pasado", function() {
        expect(getDays(new Date('2019-01-29'),new Date('2019-04-11'))).to.equal(72);
    });
});

