var assert = chai.assert,
    expect = chai.expect;

suite("Testing calcDate", function() {
    test("Test pasado", function() {
        expect(calcWorkingDate(new Date('2019-10-13'),14)).to.equal('2019-10-31');
    });
    test("Test pasado", function() {
        expect(calcWorkingDate(new Date('2019-10-31'),-14)).to.equal('2019-10-11');
    });
    test("Test pasado", function() {
        expect(calcWorkingDate(new Date('2017-07-25'),200)).to.equal('2018-05-11');
    });
    test("Test pasado", function() {
        expect(calcWorkingDate(new Date('2019-10-27'),-1)).to.equal('2019-10-25');
    });
    test("Test pasado", function() {
        expect(calcWorkingDate(new Date('2012-02-28'),3)).to.equal('2012-03-02');
    });
    test("Test pasado", function() {
        expect(calcWorkingDate(new Date('2019-01-29'),1168)).to.equal('2023-08-28');
    });
    test("Test pasado", function() {
        expect(calcWorkingDate(new Date('2017-07-25'),500)).to.equal('2019-07-16');
    });
    test("Test pasado", function() {
        expect(calcWorkingDate(new Date('2019-10-27'),-100)).to.equal('2019-06-07');
    });
    test("Test pasado", function() {
        expect(calcWorkingDate(new Date('2012-02-28'),300)).to.equal('2013-05-03');
    });
    test("Test pasado", function() {
        expect(calcWorkingDate(new Date('2019-01-29'),-1168)).to.equal('2014-06-24');
    });
});

suite("Testing getDays", function() {
    test("Test pasado", function() {
        expect(getWorkingDays(new Date('2019-10-13'),new Date('2019-10-31'))).to.equal(13);
    });
    test("Test pasado", function() {
        expect(getWorkingDays(new Date('2019-10-13'),new Date('2019-09-30'))).to.equal(-10);
    });
    test("Test pasado", function() {
        expect(getWorkingDays(new Date('2017-07-25'),new Date('2018-02-10'))).to.equal(137);
    });
    test("Test pasado", function() {
        expect(getWorkingDays(new Date('2019-10-27'),new Date('2019-10-26'))).to.equal(0);
    });
    test("Test pasado", function() {
        expect(getWorkingDays(new Date('2012-02-28'),new Date('2012-03-02'))).to.equal(3);
    });
    test("Test pasado", function() {
        expect(getWorkingDays(new Date('2019-01-29'),new Date('2022-04-11'))).to.equal(816);
    });
    test("Test pasado", function() {
        expect(getWorkingDays(new Date('2019-07-16'),new Date('2018-07-16'))).to.equal(-254);
    });
    test("Test pasado", function() {
        expect(getWorkingDays(new Date('2019-10-27'),new Date('2023-10-26'))).to.equal(1018);
    });
    test("Test pasado", function() {
        expect(getWorkingDays(new Date('2012-02-28'),new Date('2012-01-02'))).to.equal(-40);
    });
    test("Test pasado", function() {
        expect(getWorkingDays(new Date('2019-01-29'),new Date('2022-11-11'))).to.equal(967);
    });
});
